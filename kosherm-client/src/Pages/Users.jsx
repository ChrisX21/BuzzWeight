import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FiSearch } from "react-icons/fi";
import Header from '../Components/Header'

function Users() {
    const [users, setUsers] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch('/api/users')
                const data = await res.json()
                setUsers(data);
            }
            catch (err) {
                console.error('Error fetching users:', err);
            }
        }
        getUsers();
    }, [])

    const handleDelete = async (Id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const res = await fetch(`/api/users/delete/user/${Id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                console.log(data);
            }
            catch (err) {
                console.error('Error deleting user:', err);
            }
        }
    }

    return (
        <>
            <Header />
            <Title>Users</Title>
            <Wrapper>
                <SearchContainer>
                    <Ssearch placeholder='Search' type='search'></Ssearch>
                    <SsearchButton><FiSearch /></SsearchButton>
                </SearchContainer>
                <TableWrapper>
                    <STable>
                        <thead>
                            <tr>
                                <TableHead>ID</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created On</TableHead>
                                <TableHead>Operations</TableHead>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, index) => (
                                <tr key={index}>
                                    <TableData>{user.Id}</TableData>
                                    <TableData>{user.FirstName}</TableData>
                                    <TableData>{user.LastName}</TableData>
                                    <TableData>{user.Email}</TableData>
                                    <TableData>{user.Role}</TableData>
                                    <TableData>{user.CreatedOn}</TableData>
                                    <TableData>
                                        <SButton to={`/users/edit/${user.Id}`}>Update</SButton>
                                        <DelButton onClick={() => handleDelete(user.Id)}>Delete</DelButton>
                                    </TableData>
                                </tr>
                            ))}
                        </tbody>
                    </STable>
                </TableWrapper>
                <CNUbutton to={'/users/new/user'}>Create new user</CNUbutton>
            </Wrapper>
        </>
    )
}

const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    color: Black;
    margin: 2rem;
    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin: 1rem;
    }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2rem;
    background-color: #f0f0f0;
    border-radius: 1rem;
    padding: 2rem;

    @media (max-width: 768px) {
        margin: 1rem;
        padding: 1rem;
    }
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`

const Ssearch = styled.input`
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
    border: 1px solid #e9ab17;
    width: 100%;

    @media (max-width: 768px) {
        margin: 0.5rem 0;
    }
`

const SsearchButton = styled.button`
    padding: 0.5rem;
    border-radius: 1rem;
    border: 1px solid #e9ab17;
    background-color: #e9ab17;
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #ffcc00;
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 0.5rem;
    }
`

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;

    @media (max-width: 768px) {
        overflow-x: scroll;
    }
`

const STable = styled.table`
    border-collapse: collapse;
    border: 3px solid #e9ab17;
    width: 100%;
    tr:nth-child(even) {
        background-color: white;
    }
    tr {
        border-top: 1px solid #e9ab17;
    }
`

const TableHead = styled.th`
    padding: 1rem;
    background-color: rgba(233, 171, 23 );
    font-weight: bold;

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`

const TableData = styled.td`
    padding: 1rem;
    text-align: center;

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`

const SButton = styled(Link)`
    background-color: #e9ab17;
    border-radius: 1rem;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-decoration: none;
    color: black;
    
    &:hover {
        color: white;
        background-color: #78c3db;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`

const DelButton = styled(Link)`
    background-color: #e9ab17;
    border-radius: 1rem;
    border: none;
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    cursor: pointer;
    color: black;


    &:hover {
        color: white;
        background-color: red;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`

const CNUbutton = styled(Link)`
    background-color: #e9ab17;
    border-radius: 1rem;
    border: none;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    text-decoration: none;
    cursor: pointer;
    color: black;


    &:hover {
        color: white;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.8rem;
        width: 100%;
        text-align: center;
    }
`

export default Users;
