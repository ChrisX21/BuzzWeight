import { React } from 'react'
import styled from 'styled-components'
import HomeCarousel from '../Components/HomeCarousel'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function Home() {

    return (
        <>
            <Header />
            <TextWrapper>
                <h3>Revolutionizing Hive Management for Busy Beekeepers Everywhere</h3>
                <Carousel>
                    <HomeCarousel />
                </Carousel>
            </TextWrapper>
            <TextWrapper >
                <p style={{ fontSize: '1.3rem' }}>Experience the future of beehive monitoring with our solutions, ensuring efficiency, security, and speed. Our BuzzWeight trailers boast four Pollen Scales, one Hive Scale, a Weather Station, and four Conveyor Belt lines, streamlining bee pollen collection like never before.</p>
            </TextWrapper>
            <TextWrapper style={{ margin: '0 2rem', borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}>
                <Footer />
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
    margin-top: 10rem;
    border-radius: 2rem;
`

const TextWrapper = styled.div`
    text-align: center;
    margin: 2rem 0rem;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 3rem;
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 2rem;
    background-color: #f0f0f0;
    position: relative;
    h3 {
        position: absolute; 
        top: 10%;
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