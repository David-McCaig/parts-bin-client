import React from 'react'
import './ButtonSecondary.scss'

function ButtonSecondary({ children, styles, onClick }) {
    return (
        <button className='Button-Secondary' onClick={onClick} style={styles} >
            {children}
        </button>
    )
}

export default ButtonSecondary