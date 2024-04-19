import { React } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const images = [
    require('../Images/trailer_3.jpg'),
    require('../Images/trailer_1.jpg'),
    require('../Images/trailer_2.jpg'),
    require('../Images/trailer_4.jpg')
]

function Home() {

    return (
        <>
            <Header />
            <TextWrapper>
                <h3>Revolutionizing Hive Management for Busy Beekeepers Everywhere</h3>
                <Carousel>
                    <Splide
                        options={{
                            type: 'fade',
                            rewind: true,
                            width: '95%',
                            height: '40rem'
                        }}>

                        {
                            images.map((image, index) => (
                                <SplideSlide key={index} style={{ height: '60%' }}>
                                    <img src={image} alt={`Image ${index + 1}`} style={{ objectFit: 'cover', width: '100%', height: '40rem', borderRadius: '2rem' }} />
                                </SplideSlide>
                            ))}
                    </Splide>
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