import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables as chartJSRegisterables, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useParams } from 'react-router-dom';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ...chartJSRegisterables
);

function TrailerDataGraph() {
    const { id } = useParams();
    const [sensorData, setSensorData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch(`/dashboard/${id}`);
                const data = await response.json();
                setSensorData(data.sensorData);
                setLoading(false);
            }
            catch (error) {
                console.log("Error fetching sensor data: ", error);
            }
        };
        fetchSensorData();
    }, [id]);

    const formatSensorDataForChart = (data) => {
        if (!data) return null;

        const labels = data.map(entry => entry._time);
        const weights = data.map(entry => entry.scaleH);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Hive Scale (kg)',
                    data: weights,
                    fill: false,
                    borderColor: '#e9ab17',
                    backgroundColor: '#e9ab17',
                    tension: 0.1
                }
            ]
        };
    };

    const chartData = formatSensorDataForChart(sensorData);

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Record Date',
                    color: 'black',
                    font: {
                        size: 15
                    }
                },
                type: 'time',
                time: {
                    unit: 'month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Scale Hive (kg)',
                    color: 'black',
                    font: {
                        size: 15
                    }
                },
                min: 0,
                max: 100
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                    font: {
                        size: 15,
                    }
                }
            }
        }
    };


    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <SLine
                    data={chartData}
                    options={options}
                ></SLine>
            )}
        </>
    );
}

const SLine = styled(Line)`
        margin: 2rem 10rem;
        padding: 2rem;
        margin-top: 2rem;
        border-radius: 1rem;
        border: 3px solid #e9ab17;
        position: relative;
        `;

export default TrailerDataGraph;
