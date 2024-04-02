import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function NotFound() {
    return (
        <>
            <Header />
            <Wrapper>
                <Title>404 Not Found!</Title>
                <SubText>Page is not found</SubText>
                <ReturnButton to={"/"}>Return to Home</ReturnButton>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2rem;
    padding: 2rem;
    width: 50%;
    background-color: #f0f0f0;
`;

const Title = styled.h1`
    text-align: center;
`;

const SubText = styled.h4`
    text-align: center;
    margin-top: 1rem;
`;

const ReturnButton = styled(Link)`
    display: block;   
    text-align: center;
    margin-top: 2rem;
    text-decoration: none;
    color: black;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem;
    border-radius: 1rem;
    background-color: #e9ab17;
    border: none;
    transition: color 0.3s ease;

    &:hover {
        color: white;
    }
`;

export default NotFound;
