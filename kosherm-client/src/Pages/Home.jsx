import React from 'react'
import styled from 'styled-components'
import HomeCarousel from '../Components/HomeCarousel'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function Home() {
    return (
        <>
            <Header />
            <HomeText>
                <h3>Revolutionizing Hive Management for Busy Beekeepers Everywhere</h3>
                <CarouselContainer>
                    <HomeCarousel />
                </CarouselContainer>
            </HomeText>
            <TextWrapper>
                <p>Experience the future of beehive monitoring with our solutions, ensuring efficiency, security, and speed. Our BuzzWeight trailers boast four Pollen Scales, one Hive Scale, a Weather Station, and four Conveyor Belt lines, streamlining bee pollen collection like never before.</p>
            </TextWrapper>
            <TextWrapper style={{ margin: '0 2rem', borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}>
                <Footer />
            </TextWrapper>
        </>
    )
}

const CarouselContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    @media (max-width: 768px) {
        margin-top: 1rem;
    }
`

const HomeText = styled.div`
    text-align: center;
    margin: 2rem;
    margin-top: 2rem;
    margin-bottom: 0;
    padding: 1rem;
    border-radius: 2rem;
    background-color: #f0f0f0;
    position: relative;

    h3 {
        margin-bottom: 0;
        font-size: 2rem;

        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        margin: 1rem;
        padding: 1rem;
    }
`

const TextWrapper = styled.div`
    text-align: center;
    margin: 2rem;
    padding: 1rem;
    border-radius: 2rem;
    background-color: #f0f0f0;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

export default Home
