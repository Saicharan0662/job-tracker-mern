import React from 'react'
import './button.css'
const Button = ({ text = "click me!!", ...otherProps }) => {
    return (
        <button className='font-sans btn bg-green-600 hover:bg-green-500 text-white'{...otherProps} >{text}</button>
    )
}

export default Button
