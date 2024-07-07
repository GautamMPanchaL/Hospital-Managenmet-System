import React from 'react'

export default function Biography({imageUrl}) {
  return (
    <div>
        <div className='container biography'>
        <div className='banner'>
        <img className='aboutImg' src = {imageUrl}>
        </img>
        </div>
        <div className='banner'>
            <p>Biography</p>
            <h3>Who We are</h3>
            <p>
                lorem50
            </p>
            <p>lorem8</p>
            <p>lorem5</p>
            <p>lorem35</p>
        </div>
        </div>
    </div>
  )
}
