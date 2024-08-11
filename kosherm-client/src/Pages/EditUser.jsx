import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';

const EditUser = () => {
    const [user, setUser] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        RoleId: ''
    });
    const userId = window.location.pathname.split('/').pop();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                console.log('User edited successfully!');
            } else {
                console.error('Failed to edit user');
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    return (
        <>
            <Header />
            <SForm onSubmit={handleSubmit}>
                <FormTitle>Edit User</FormTitle>
                <InputWrapper>
                    <SLabel>First Name:</SLabel>
                    <SInput
                        type="text"
                        name="FirstName"
                        value={user.FirstName}
                        onChange={handleChange}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <SLabel>Last Name:</SLabel>
                    <SInput
                        type="text"
                        name="LastName"
                        value={user.LastName}
                        onChange={handleChange}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <SLabel>Email:</SLabel>
                    <SInput
                        type="email"
                        name="Email"
                        value={user.Email}
                        onChange={handleChange}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <SLabel>Password:</SLabel>
                    <SInput
                        type="password"
                        name="Password"
                        value={user.Password}
                        onChange={handleChange}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <SLabel>Role:</SLabel>
                    <SSelect
                        name="RoleId"
                        value={user.RoleId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </SSelect>
                </InputWrapper>
                <SButton type="submit">Edit User</SButton>
            </SForm>
        </>
    );
};

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;
    padding: 2rem;
    border-radius: 1rem;
    background-color: #f0f0f0;

    @media (max-width: 768px) {
        margin: 1rem;
        padding: 1.5rem;
    }
`;

const FormTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
`;

const InputWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const SLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
`;

const SInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
`;

const SSelect = styled.select`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
`;

const SButton = styled.button`
    padding: 1rem 2rem;
    background-color: #e9ab17;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #d48b16;
    }
`;

export default EditUser;
