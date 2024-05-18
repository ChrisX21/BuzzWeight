import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const images = [
  require('../Images/trailer_3.jpg'),
  require('../Images/trailer_1.jpg'),
  require('../Images/trailer_2.jpg'),
  require('../Images/trailer_4.jpg')
]

function HomeCarousel() {
  return (
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
            <img src={image} alt={index + 1} style={{ objectFit: 'cover', width: '100%', height: '40rem', borderRadius: '2rem' }} />
          </SplideSlide>
        ))}
    </Splide>
  )
}

export default HomeCarousel