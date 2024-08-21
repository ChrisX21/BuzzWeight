import styled from 'styled-components';

function TrailerDataTable({ sensorData }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}, ${date.toLocaleDateString('en-GB')}`;
    };

    return (
        <>
            <Wrapper>
                
                <ScrollableTableWrapper>
                    <StyledTable>
                        <thead>
                            <tr>
                                <TableHead>Scale 1</TableHead>
                                <TableHead>Scale 2</TableHead>
                                <TableHead>Scale 3</TableHead>
                                <TableHead>Scale 4</TableHead>
                                <TableHead>Scale Hive</TableHead>
                                <TableHead>Hive Temp</TableHead>
                                <TableHead>Inside Temp</TableHead>
                                <TableHead>Outside Temp</TableHead>
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
                </ScrollableTableWrapper>
            </Wrapper>
        </>
    );
}


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

const ScrollableTableWrapper = styled.div`
    width: 100%;
    max-height: 500px; 
    overflow: auto; 
    margin-bottom: 1rem;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        overflow-x: scroll;
    }
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    min-width: 900px; 
    border: 3px solid #FFD580;

    tr:nth-child(even) {
        background-color: #f5f5f5;
    } 
    tr {
        border-top: 1px solid #FFD580;
    }

    @media (max-width: 768px) {
        font-size: 0.85rem;
    }
`;

const TableHead = styled.th`
    padding: 1rem;
    background-color: #FFD580;
    color: black;
    font-weight: bold;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

const TableData = styled.td`
    padding: 1rem;
    text-align: center;
    white-space: nowrap; 

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

export default TrailerDataTable;
