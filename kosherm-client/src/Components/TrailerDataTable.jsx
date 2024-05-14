import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'

function TrailerDataTable() {
    const { id } = useParams();
    const [sensorData, setSensorData] = useState(null);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch(`/dashboard/${id}`)
                const data = await response.json();
                setSensorData(data.sensorData)
            }
            catch (error) {
                console.log("Error fetching sensor data: ", error);
            }
        }
        fetchSensorData();
    }, [id])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}, ${date.toLocaleDateString('en-GB')}`;
        return formattedDate;
    };

    const exportData = async () => {
        try {
            const response = await fetch(`/dashboard/export/${id}`);
            const data = await response.text();
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sensorData.csv';
            a.click();
        }
        catch (error) {
            console.log("Error exporting data: ", error);
        }
    }

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
    )
}

const Wrapper = styled.div`
    display: flex;
    margin: 2rem 6rem;
    top: 25%;
    

`

const Slink = styled(Link)`
    display: block;
    text-align: center;
    text-decoration: none;
    margin: 0 auto; 
    width: 20%;
    color: black;
    padding: 0.7rem;
    border-radius: 1rem;
    background-color: #e9ab17;
    border: none;
    font-size: 1.2rem;

    &:hover {
        color: white;
        transition: 0.3s, out;
    }
`

const StyledTable = styled.table`
    border-collapse: collapse;
    
    border: 3px solid #e9ab17;
    tr:nth-child(even) {
        background-color: #f5f5f5;
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

export default TrailerDataTable
