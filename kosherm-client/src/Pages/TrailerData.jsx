import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { TbArrowBackUp } from "react-icons/tb";
import Header from '../Components/Header';
import TrailerDataTable from '../Components/TrailerDataTable';
import TrailerDataGraph from '../Components/TrailerDataGraph';
import TrailerSensorsGraph from '../Components/TrailerSensorsGraph';

function TrailerData() {
    const { id } = useParams();

    if (id > 5) {
        return <Navigate to="/NotFound" />;
    }

    return (
        <>
            <Header />
            <Title>Trailer {id}</Title>
            <TrailerDataTable />
            <TrailerSensorsGraph />
            <TrailerDataGraph />
            <SreturnButton to='/dashboard'><TbArrowBackUp />   Return to Dashboard</SreturnButton>
        </>
    );
}

const Title = styled.h1`
    text-align: center;
    margin: 2rem;
    font-size: 3rem;

    @media (max-width: 768px) {
        font-size: 2rem;
        margin: 1rem;
    }
`
const SreturnButton = styled(Link)`
    display: block;
    text-align: center;
    text-decoration: none;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 15%;
    color: black;
    padding: 0.2rem;
    border-radius: 1rem;
    background-color: #e9ab17;
    border: none;
    font-size: 1rem;

    &:hover {
        color: white;
        transition: 0.3s, out;
    }

    @media (max-width: 768px) {
        width: 30%;
        padding: 0.5rem;
        font-size: 1rem;
    }
`

export default TrailerData