import React from 'react'
import q1 from '../../assets/q1.png'
import q2 from '../../assets/q2.png'
import q3 from '../../assets/q3.png'
import q4 from '../../assets/q4.png'
import q5 from '../../assets/q5.png'
import Carousel from 'react-material-ui-carousel'


function QuoteCarousel() {
    const quotes = [ q1, q2, q3, q4, q5 ]
  return (
    <Carousel 
        duration="500"
        autoPlay="true"
        indicatorIconButtonProps={{
          style: {
              display : "none"
          }
        }}
    >
        {
            quotes.map( (quote) => <img className="quote"  src={quote} /> )
        }
    </Carousel>
  )
}

export default QuoteCarousel