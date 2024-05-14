import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables as chartJSRegisterables, LineElement, CategoryScale, LinearScale, PointElement, Ticks } from 'chart.js';
import { useParams } from 'react-router-dom';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ...chartJSRegisterables
);

function TrailerSensorsGraph() {
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

    const formatDataForChart = (data) => {
        if (!data) return null;

        const labels = data.map(entry => entry._time);
        const weights = ['scale1', 'scale2', 'scale3', 'scale4'];
        const datasets = weights.map((weight, index) => {
            let color;
            switch (index) {
                case 0:
                    color = 'red';
                    break;
                case 1:
                    color = 'green';
                    break;
                case 2:
                    color = 'blue';
                    break;
                case 3:
                    color = 'magenta';
                    break;
                default:
                    color = 'black';
            }
            return {
                label: `Scale ${index + 1}`,
                data: data.map((entry) => entry[weight]),
                fill: false,
                borderColor: color,
                backgroundColor: color,
                tension: 0.1
            };
        });

        return {
            labels,
            datasets
        };

    };

    const chartData = formatDataForChart(sensorData);

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
                    text: 'Pollen Scales (g)',
                    color: 'black',
                    font: {
                        size: 15
                    }
                },
                min: 0,
                max: 300,
                ticks: {
                    stepSize: 10
                }
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
            margin-top: 4rem;
            border-radius: 1rem;
            border: 3px solid #e9ab17;
            position: relative;
            `;

export default TrailerSensorsGraph