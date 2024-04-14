import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TbArrowBackUp } from "react-icons/tb";
import Header from '../Components/Header';
import TrailerDataTable from '../Components/TrailerDataTable';
import TrailerDataGraph from '../Components/TrailerDataGraph';
import TrailerSensorsGraph from '../Components/TrailerSensorsGraph';

function TrailerData() {
    const { id } = useParams();

    return (
        <>
            <Header />
            <Title>Trailer {id}</Title>
            <Wrapper>
                <TrailerDataTableWrapper>
                    <TrailerDataTable />
                </TrailerDataTableWrapper>
                <TrailerDataGraphWrapper>
                    <TrailerDataGraph />
                </TrailerDataGraphWrapper>
            </Wrapper>
            <TrailerSensorsGraph />
            <SreturnButton to='/dashboard'><TbArrowBackUp />   Return to Dashboard</SreturnButton>
        </>
    );
}
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const TrailerDataTableWrapper = styled.div`
    flex: 1;
`

const TrailerDataGraphWrapper = styled.div`
    flex: 1;
`
const Title = styled.h1`
    text-align: center;
    margin: 2rem;
    font-size: 3rem;
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
`

export default TrailerData