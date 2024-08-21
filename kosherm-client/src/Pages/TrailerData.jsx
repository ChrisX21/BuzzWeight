import { React, useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { TbArrowBackUp } from "react-icons/tb";
import Header from '../Components/Header';
import TrailerDataTable from '../Components/TrailerDataTable';
import TrailerDataGraph from '../Components/TrailerDataGraph';
import TrailerSensorsGraph from '../Components/TrailerSensorsGraph';

function TrailerData() {
    const { id } = useParams();

    const [sensorData, setSensorData] = useState(null);

    const [selectedDateRange, setSelectedDateRange] = useState({
        start: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10),
        end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10)
    });

    const fetchSensorData = async (start, end) => {
        try {
            const response = await fetch(`/api/dashboard/${id}?start=${new Date(start).toISOString()}&end=${new Date(end).toISOString()}`);
            const data = await response.json();
            setSensorData(data.sensorData);
        } catch (error) {
            console.log("Error fetching sensor data: ", error);
        }
    };

    useEffect(() => {
        // Fetch data when the component mounts
        fetchSensorData(selectedDateRange.start, selectedDateRange.end);
    }, [id, selectedDateRange.start, selectedDateRange.end]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setSelectedDateRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const exportData = async (start, end) => {
        try {
            const response = await fetch(`/api/dashboard/export/${id}?start=${new Date(start).toISOString()}&end=${new Date(end).toISOString()}`);
            const data = await response.text();
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sensorData_${start}_to_${end}.csv`;
            a.click();
        } catch (error) {
            console.log("Error exporting data: ", error);
        }
    };

    if (id > 5) {
        return <Navigate to="/NotFound" />;
    }
    return (
        <>
            <Header />
            <Title>Trailer {id}</Title>
            <Wrapper>
                <DateRangeForm>
                    <StyledDateInput
                        type="date"
                        name="start"
                        value={selectedDateRange.start || ''}
                        onChange={handleDateChange}
                        placeholder="Start Date"
                    />
                    <Separator> - </Separator>
                    <StyledDateInput
                        type="date"
                        name="end"
                        value={selectedDateRange.end || ''}
                        onChange={handleDateChange}
                        placeholder="End Date"
                    />
                </DateRangeForm>
                <ExportButton onClick={() => exportData(selectedDateRange.start, selectedDateRange.end)}>
                    Export Table
                </ExportButton>
            </Wrapper >
            <TrailerDataTable sensorData={sensorData} />
            <TrailerSensorsGraph sensorData={sensorData} />
            <TrailerDataGraph sensorData={sensorData} />
            <Wrapper>
                <SreturnButton to='/dashboard'><TbArrowBackUp />   Return to Dashboard</SreturnButton>
            </Wrapper>
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
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    max-width: 100%;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;


const ExportButton = styled.button`
    margin-left: 16px;
    padding: 8px 16px;
    background-color: #FFD580;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #FFC14D;
    }

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;


const DateRangeForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;

    @media (max-width: 768px) {
        flex-direction: row;
        padding: 1rem;
    }
`;

const StyledDateInput = styled.input`
    flex: 1;
    padding: 8px;
    margin: 5px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: white;

    @media (max-width: 768px) {
        margin: 0.5rem;
        width: 100%;
    }
`;

const Separator = styled.div`
    margin: 0 16px;
    font-size: 1.2rem;

    @media (max-width: 768px) {
        margin: 8px 0;
        font-size: 1rem;
    }
`;

const SreturnButton = styled(Link)`
    margin-left: 16px;
    padding: 8px 16px;
    background-color: #FFD580;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    

    &:hover {
        background-color: #FFC14D;
    }

    @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 10px;
    }
`

export default TrailerData