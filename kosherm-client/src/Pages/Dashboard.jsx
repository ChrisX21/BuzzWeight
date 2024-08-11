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
                <ButtonGroup>
                    <Buttons to={"/dashboard/1"}>Trailer 1</Buttons>
                    <Buttons to={"/dashboard/2"}>Trailer 2</Buttons>
                    <Buttons to={"/dashboard/3"}>Trailer 3</Buttons>
                    <Buttons to={"/dashboard/4"}>Trailer 4</Buttons>
                    <Buttons to={"/dashboard/5"}>Trailer 5</Buttons>
                </ButtonGroup>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    text-align: center;
    margin: 4rem 9rem 5rem;
    padding: 2rem 0 6rem;
    border-radius: 2rem;
    background-color: #f0f0f0;

    h1 {
        margin-bottom: 6rem;
        font-size: 4rem;

        @media (max-width: 768px) {
            font-size: 2.5rem;
            margin-bottom: 4rem;
        }

        @media (max-width: 480px) {
            font-size: 2rem;
            margin-bottom: 2rem;
        }
    }

    @media (max-width: 768px) {
        margin: 2rem;
        padding: 2rem;
    }

    @media (max-width: 480px) {
        margin: 1rem;
        padding: 1rem;
    }
`

const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

const Buttons = styled(Link)`
    padding: 2rem;
    text-decoration: none;
    border: none;
    border-radius: 1rem;
    font-size: 1.7rem;
    font-weight: 500;
    margin: 1rem;
    color: black;
    background-color: #e9ab17;

    &:hover {
        color: white;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
        padding: 1.5rem;
        margin: 1rem 0;
        width: 80%;
        text-align: center;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
        padding: 1rem;
        width: 100%;
    }
`

export default Dashboard;
