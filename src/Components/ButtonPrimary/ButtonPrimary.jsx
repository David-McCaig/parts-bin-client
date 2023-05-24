import React from 'react';
import './ButtonPrimary.scss';

//Primary button. Used in Upload component and CardPrimary component
function ButtonPrimary({ children, style }) {
    return (
        <button style={style} className="button__primary">
            {children}
        </button>
    )
}

export default ButtonPrimary