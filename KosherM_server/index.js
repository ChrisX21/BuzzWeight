import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getUserByEmail, getLatestSensorDataForTrailer, getSensorDataForTrailer, getAllUsers, createUser } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


const authenticateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.json({ message: "Access token not found" });
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
      }
      else {
        return res.sendStatus(403);
      }
    }
    else {
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
}

app.post("/login", async (req, res) => {
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
    }
    else {
      return res.json({ message: "Invalid Password!" });
    }
  }
  catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/auth', (req, res) => {
  return authenticateToken(req, res, () => {
    res.json({ authenticated: true });
  });
});

app.get('/admin', (req, res) => {
  const token = req.cookies.accessToken;
  if (token != null) {
    const user = jwt.decode(token);

    if (user.RoleId === 3 || user.RoleId === 1) {
      res.json({ admin: true });
    }
    else {
      res.json({ admin: false });
    }
  }
  else {
    res.json({ message: 'User is not logged in' });
  }
})

app.get("/logout", (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: "Logged out successfully" });
});

// app.get("/*", (req, res) => {
//   res.sendFile(__dirname + "/build/index.html");
// })

app.get("/dashboard/:Id", authenticateToken, async (req, res) => {
  const trailerId = req.params.Id;
  const sensorData = await getLatestSensorDataForTrailer(trailerId);
  res.json({ sensorData });
});

app.get("/dashboard/export/:Id", authenticateToken, async (req, res) => {
  const trailerId = req.params.Id;
  const sensorData = await getSensorDataForTrailer(trailerId);
  const csv = sensorData.map(data => {
    return `${data.Date},${data.WeightSensor1},${data.WeightSensor2},${data.WeightSensor3},${data.WeightSensor4},${data.WeightSensorK}`;
  }).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="sensorData.csv"');
  res.send(csv);

});

app.get("/users", authenticateToken, async (req, res) => {
  const users = await getAllUsers();

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
  res.json(users.map(user => ({ Id: user.Id, FirstName: user.FirstName, LastName: user.LastName, Email: user.Email, Role: user.Name, CreatedOn: formatDate(user.CreatedOn) })));
})

app.post("/users/new/user", authenticateToken, async (req, res) => {
  const user = req.body;
  await createUser(user.Email, user.Password, user.FirstName, user.LastName, user.RoleId);
  res.json("User created successfully!");
})

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});