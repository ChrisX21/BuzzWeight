import React from 'react'
import Header from '../Components/Header'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <Header />
            <Wrapper>
                <h1>Dashboard</h1>
                <Buttons to={"/dashboard/1"}>Trailer 1</Buttons>
                <Buttons to={"/dashboard/2"}>Trailer 2</Buttons>
                <Buttons to={"/dashboard/3"}>Trailer 3</Buttons>
                <Buttons to={"/dashboard/4"}>Trailer 4</Buttons>
                <Buttons to={"/dashboard/5"}>Trailer 5</Buttons>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    text-align: center;
    margin-left: 9rem;
    margin-right: 9rem;
    margin-top: 4rem;
    padding-bottom: 6rem;
    padding-top: 2rem;
    margin-bottom: 5rem;
    border-radius: 2rem;
    background-color: #f0f0f0;
    position: relative;

    h1{
        margin-bottom: 9rem;
        font-size: 4rem;
    }
`

const Buttons = styled(Link)`
    padding: 2rem;
    text-decoration: none;
    border: none;
    border-radius: 1rem;
    font-size: 1.7rem;
    font-weight: 500;
    margin: 2rem 2rem;
    color: black;
    background-color: #e9ab17;

    &:hover {
        color: white;
        transition: 0.3s, out;
    }
`
export default Dashboard