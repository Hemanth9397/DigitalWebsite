import React from 'react'
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <div  className='outer-spinner'>
        <div className='inner-spinner'/>
      </div>
    </div>
  )
}

export default Spinner