import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

function TrailerDataTable() {
    const { id } = useParams();
    const [sensorData, setSensorData] = useState(null);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch(`/api/dashboard/${id}`);
                const data = await response.json();
                setSensorData(data.sensorData);
            } catch (error) {
                console.log("Error fetching sensor data: ", error);
            }
        };
        fetchSensorData();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}, ${date.toLocaleDateString('en-GB')}`;
        return formattedDate;
    };

    const exportData = async () => {
        try {
            const response = await fetch(`/api/dashboard/export/${id}`);
            const data = await response.text();
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sensorData.csv';
            a.click();
        } catch (error) {
            console.log("Error exporting data: ", error);
        }
    };

    return (
        <>
            <Wrapper>
                <StyledTable>
                    <thead>
                        <tr>
                            <TableHead>Scale 1</TableHead>
                            <TableHead>Scale 2</TableHead>
                            <TableHead>Scale 3</TableHead>
                            <TableHead>Scale 4</TableHead>
                            <TableHead>Scale Hive</TableHead>
                            <TableHead>Hive temp</TableHead>
                            <TableHead>Inside temp</TableHead>
                            <TableHead>Outside temp</TableHead>
                            <TableHead>Hive Humidity</TableHead>
                            <TableHead>Inside Humidity</TableHead>
                            <TableHead>Outside Humidity</TableHead>
                            <TableHead>Date</TableHead>
                        </tr>
                    </thead>
                    <tbody>
                        {sensorData && sensorData.map((data, index) => (
                            <tr key={index}>
                                <TableData>{data.scale1} g</TableData>
                                <TableData>{data.scale2} g</TableData>
                                <TableData>{data.scale3} g</TableData>
                                <TableData>{data.scale4} g</TableData>
                                <TableData>{data.scaleH} kg</TableData>
                                <TableData>{data.temp1} °C</TableData>
                                <TableData>{data.temp2} °C</TableData>
                                <TableData>{data.temp3} °C</TableData>
                                <TableData>{data.hum1} %</TableData>
                                <TableData>{data.hum2} %</TableData>
                                <TableData>{data.hum3} %</TableData>
                                <TableData>{formatDate(data._time)}</TableData>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </Wrapper>
            <Slink onClick={exportData}>Export Table</Slink>
        </>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem 1rem;
    overflow-x: auto;

    @media (max-width: 768px) {
        margin: 1rem;
    }
`;

const Slink = styled(Link)`
    display: block;
    text-align: center;
    text-decoration: none;
    margin: 1rem auto;
    width: fit-content;
    color: black;
    padding: 0.7rem;
    border-radius: 1rem;
    background-color: #e9ab17;
    border: none;
    font-size: 1.2rem;

    &:hover {
        color: white;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        width: 80%;
        padding: 0.5rem;
        font-size: 1rem;
    }
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    border: 3px solid #e9ab17;

    tr:nth-child(even) {
        background-color: #f5f5f5;
    } 
    tr {
        border-top: 1px solid #e9ab17;
    }

    @media (max-width: 768px) {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
`;

const TableHead = styled.th`
    padding: 1rem;
    background-color: #e9ab17;
    color: white;
    font-weight: bold;

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`;

const TableData = styled.td`
    padding: 1rem;
    text-align: center;

    @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`;

export default TrailerDataTable;
