import React from 'react'

const URLBox = (props) => {
  return (
    <div className='urlBox'>
      <a href={props.href} target='_blank'>
        <h4>{props.title}</h4>
        <p>{props.desc}</p>
        <p>{props.href}</p>
      </a>
    </div>
  )
}

export default URLBox