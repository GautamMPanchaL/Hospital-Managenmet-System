import React from 'react'

export default function Hero() {
    const title = "MediCare";
    let imageUrl = "undefined"
    const description = <p></p>
  return (
    <div className='hero-container'>
        <div className='banner'>
        <h1>
            {title}
        </h1>
        <p>
            {description}
        </p>
        </div>
        <div className='banner'>
            <img src = {imageUrl} alt='hero' className='animated-banner'>
            </img>
        </div>
    </div>
  )
}
