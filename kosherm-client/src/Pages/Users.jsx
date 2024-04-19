import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FiSearch } from "react-icons/fi";
import Header from '../Components/Header'


function Users() {
    const [users, setUsers] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch('/users')
                const data = await res.json()
                setUsers(data);
            }
            catch (err) {
                console.error('Error fetching users:', err);
            }
        }
        getUsers();
    }, [])

    return (
        <>
            <Header />
            <Title>Users</Title>
            <Wrapper>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                    <Ssearch placeholder='Search' type='search'></Ssearch>
                    <SsearchButton><FiSearch /></SsearchButton>
                </div>
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
                                    <SButton>Update</SButton>
                                    <DelButton>Delete</DelButton>
                                </TableData>
                            </tr>
                        ))}
                    </tbody>
                </STable>
                <CNUbutton>Create new user</CNUbutton>
            </Wrapper>
        </>
    )
}

const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    color: Black;
    margin: 2rem;
`

const Ssearch = styled.input`
    display: inline-block;
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
    border: 1px solid #e9ab17;
`
const SsearchButton = styled.button`
    display: inline-block;
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
`
const CNUbutton = styled.button`
    background-color: #e9ab17;
    border-radius: 1rem;
    border: none;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
        color: white;
        transition: 0.3s;
    }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2rem ;
    background-color: #f0f0f0;
    border-radius: 1rem;
    padding: 2rem;
`

const STable = styled.table`
    border-collapse: collapse;
    border: 3px solid #e9ab17;
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
`

const TableData = styled.td`
    padding: 1rem;
    text-align: center;
`

const SButton = styled.button`
    background-color: #e9ab17;
    border-radius: 1rem;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    
    &:hover {
        color: white;
        background-color: #78c3db;
        transition: 0.3s;
    }
`

const DelButton = styled.button`
    background-color: #e9ab17;
    border-radius: 1rem;
    border: none;
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
        color: white;
        background-color: red;
        transition: 0.3s;
    }
`

export default Users