import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { TbArrowBackUp } from "react-icons/tb";
import TrailerDataTable from '../Components/TrailerDataTable'
import Header from '../Components/Header'
import TrailerDataGraph from '../Components/TrailerDataGraph';

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


export default TrailerData