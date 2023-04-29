import React from 'react'

const YoutubeVideo =  (props) => {
  return (
    // <div className='resource'>
      <iframe 
        className='resourceVideo' 
        src={`${props.src}`} 
        title="YouTube video player" 
        frameborder="0" 
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
        >
      </iframe>
    // </div>
  )
}

export default YoutubeVideo