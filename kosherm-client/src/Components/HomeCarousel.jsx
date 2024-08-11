import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import styled from 'styled-components';
import '@splidejs/react-splide/css';

const images = [
  require('../Images/trailer_3.jpg'),
  require('../Images/trailer_1.jpg'),
  require('../Images/trailer_2.jpg'),
  require('../Images/trailer_4.jpg')
]

function HomeCarousel() {
  return (
    <Wrapper>
      <Splide
        options={{
          type: 'fade',
          rewind: true,
          width: '100%',
          heightRatio: 0.6,
          autoplay: true,
          interval: 3000,
          pauseOnHover: true,
        }}>
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <CarouselImage src={image} alt={`Slide ${index + 1}`} />
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;  
    max-width: 1200px;  
    padding: 2rem;
    background-color: #f0f0f0;
    border-radius: 1rem;
    margin: auto;  

    @media (max-width: 768px) {
        width: 100%;
        padding: 1rem;
    }
`

const CarouselImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 1rem;
`

export default HomeCarousel
