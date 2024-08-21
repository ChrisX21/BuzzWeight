import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables as chartJSRegisterables, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ...chartJSRegisterables
);

function TrailerDataGraph({ sensorData }) {
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
                max: 100,
                grid: {
                    display: false
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
            {sensorData ? (
                <SLine data={chartData} options={options} />
            ) : (
                <div>Loading...</div>
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

    @media (max-width: 768px) {
        margin: 2rem;
        padding: 0.3rem;
    }
`;

export default TrailerDataGraph;
