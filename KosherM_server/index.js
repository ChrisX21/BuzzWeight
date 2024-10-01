import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  getUserByEmail,
  deleteUser,
  editUser,
  createUser,
  getAllUsers,
  getUserById
} from './services/userDatabaseService.js';
import { getSensorDataByDateRange } from './services/queryInfluxService.js';
import { writeSensorData } from './services/writeInfluxService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const formatDate = (date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return new Date(date).toLocaleString('en-GB', options);
};

const authenticateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.json({ authenticated: false });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (refreshErr, refreshUser) => {
          if (refreshErr) {
            return res.sendStatus(403);
          }

          const newAccessToken = generateAccessToken(refreshUser);
          res.cookie('accessToken', newAccessToken, { httpOnly: true });

          req.user = refreshUser;
          next();
        });
      } else {
        return res.sendStatus(403);
      }
    } else {
      req.user = user;
      next();
    }
  });
};

const generateAccessToken = (user) => {
  delete user.exp;
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  delete user.exp;
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// API routes
app.post("/api/login", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.json({ message: "Invalid Credentials" });
    }

    if (password === user.Password) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });

      return res.status(200).json({ message: "Login successful!" });
    } else {
      return res.json({ message: "Invalid Password!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/auth', authenticateToken, (req, res) => {
  const authenticated = true;
  const admin = req.user.RoleId === 1;
  res.json({ authenticated, admin });
});

app.get("/api/logout", (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: "Logged out successfully" });
});

app.post('/api/getData', (req, res) => {
  try {
    const data = req.body;

    writeSensorData(data, data.TrailerId);
    res.status(200).json({ message: "Data received successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/dashboard/:Id", authenticateToken, async (req, res) => {
  const trailerId = req.params.Id;
  const { start, end } = req.query;

  try {
    const sensorData = await getSensorDataByDateRange(trailerId, start, end);
    res.json({ sensorData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
});

app.get("/api/dashboard/export/:Id", authenticateToken, async (req, res) => {
  const trailerId = req.params.Id;
  const { start, end } = req.query;
  const sensorData = await getSensorDataByDateRange(trailerId, start, end);

  const csv = sensorData.map(data => {
    return `${formatDate(data._time)},${data.scale1}g,${data.scale2}g,${data.scale3}g,${data.scale4}g,${data.scaleH}kg,${data.temp1}°C,${data.temp2}°C,${data.temp3}°C,${data.hum1}%,${data.hum2}%,${data.hum3}%`;
  }).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="sensorData.csv"');
  res.send(csv);
});

app.get("/api/users", authenticateToken, async (req, res) => {
  const users = await getAllUsers();
  res.json(users.map(user => ({
    Id: user.Id,
    FirstName: user.FirstName,
    LastName: user.LastName,
    Email: user.Email,
    Role: user.Name,
    CreatedOn: formatDate(user.CreatedOn)
  })));
});

app.get("/api/users/:Id", authenticateToken, async (req, res) => {
  const userId = req.params.Id;
  const user = await getUserById(userId);
  res.json(user);
});

app.post("/api/users/new/user", authenticateToken, async (req, res) => {
  const user = req.body;
  await createUser(user.email, user.password, user.firstName, user.lastName, user.roleId);
  res.json({ message: "User created successfully!" });
});

app.put("/api/users/edit", authenticateToken, async (req, res) => {
  const user = req.body;
  await editUser(user.Id, user.Email, user.Password, user.FirstName, user.LastName, user.RoleId);
  res.json({ message: "User edited successfully!" });
});

app.delete("/api/users/delete/user/:Id", authenticateToken, async (req, res) => {
  const userId = req.params.Id;
  await deleteUser(userId);
  res.json({ message: "User deleted successfully!" });
});

// app.get('/*', (req, res) => {
//   res.sendFile(__dirname + '/build/index.html');
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
