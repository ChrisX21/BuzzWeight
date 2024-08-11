import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';

function CreateUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const roleId = role === 'admin' ? 1 : 2;
            const response = await fetch('/api/users/new/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, password, roleId })
            });
            const data = await response.json();
            console.log(data.message);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setRole('');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            <Header />
            <SForm onSubmit={handleSubmit}>
                <FormTitle>Create User</FormTitle>
                <InputWrapper>
                    <SInput
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <SInput
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <SInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <SInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <SSelect
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </SSelect>
                </InputWrapper>
                <SButton type="submit">Create</SButton>
            </SForm>
        </>
    );
}

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f0f0f0;
    border-radius: 1rem;
    max-width: 500px;

    @media (max-width: 768px) {
        margin: 1rem;
        padding: 1.5rem;
        max-width: 90%;
    }

    @media (max-width: 480px) {
        margin: 0.5rem;
        padding: 1rem;
    }
`;

const FormTitle = styled.h1`
    font-size: 2.5rem;
    color: black;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
`;

const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;
`;

const SInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    border-radius: 1rem;
    border: 1px solid #e9ab17;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #ffcc00;
    }

    @media (max-width: 480px) {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
`;

const SSelect = styled.select`
    width: 100%;
    padding: 0.75rem;
    border-radius: 1rem;
    border: 1px solid #e9ab17;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #ffcc00;
    }

    @media (max-width: 480px) {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
`;

const SButton = styled.button`
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    background-color: #e9ab17;
    border: none;
    border-radius: 1rem;
    font-size: 1.2rem;
    color: black;
    font-weight: bold;

    &:hover {
        color: white;
        background-color: #ffcc00;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        padding: 0.75rem;
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
`;

export default CreateUser;
