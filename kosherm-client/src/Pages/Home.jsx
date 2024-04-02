import { React } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Header from '../Components/Header'

function Home() {

    return (
        <>
            <Header />
            <TextWrapper>
                <h3>Revolutionizing Hive Management for Busy Beekeepers Everywhere</h3>
                <Carousel>
                    <Splide>
                        <SplideSlide>

                        </SplideSlide>
                    </Splide>
                </Carousel>
            </TextWrapper>
        </>
    )
}

const Carousel = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    margin: 2rem 0rem;
    margin-top: 20rem;
    border-radius: 2rem;
`

const TextWrapper = styled.div`
    text-align: center;
    margin: 2rem 0rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 4rem;
    padding: 2rem;
    margin-bottom: 5rem;
    border-radius: 2rem;
    background-color: #f0f0f0;
    position: relative;
    h3 {
        position: absolute; 
        top: 15%;
        left: 50%; 
        transform: translate(-50%, -50%); 
        padding: 1rem;
        font-size: 2rem;

        @media (max-width: 768px) {
            position: static;
            transform: none; 
            margin-top: 1rem; 
    }
}
`
    
export default Home