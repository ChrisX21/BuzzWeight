import { React, useState } from 'react'
import styled from 'styled-components'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const submitUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.message === "Login successful!") {
                navigate("/");
                window.location.reload();
            }
            else {
                alert('Wrong password. Please try again.');
            }
        }
        catch (error) {
            alert('There was an error during login. Please try again later.');
        }
    };

    return (
        <>
            <Header />
            <FormWrapper>
                <SForm onSubmit={submitUser}>
                    <h1>Login</h1>
                    <div>
                        <input type='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <SButton type='submit'>Login</SButton>
                    </div>
                </SForm>
            </FormWrapper>
        </>
    )
}

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15rem;
`

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    margin-top: 5rem;
    border-radius: 2rem;
    padding: 2rem;
    width: 25rem;
    
    background-color: #f0f0f0;
    
    @media (max-width: 768px) {
        margin: 5rem 5rem;
        overflow: hidden; 
        justify-content: center;
        align-items: center;
        position: absolute;
        outline-color: #e9ab17;
    }

    input {
        margin: 0.5rem;
        font-size: 1.2rem;
        padding: 0.5rem; 
        border-radius: 0.5rem;
        border: none;
        border: 2px solid #e9ab17;       
        @media (max-width: 768px) {
            position: static;
            transform: none; 
            margin-top: 1rem; 
            outline-color: #e9ab17;
    }
}
`
const SButton = styled.button`
        margin: 0.5rem;
        font-size: 1.2rem;
        padding: 0.5rem; 
        border-radius: 0.5rem;
        border: none;
        margin-top: 2rem;
        width: 9rem;
        h1 {
            margin-bottom: 6rem;
        }
        background-color: #e9ab17;     
        
        &:hover {
            color: white;
            transition: 0.3s;
        }

        @media (max-width: 768px) {
            position: static;
            transform: none; 
            margin-top: 1rem;
        }
`
export default Login