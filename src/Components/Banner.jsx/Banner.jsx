import React from 'react'
import yeti from '../../assets/images/Yeti-SB135-SRAM-Transmission-Review-3.webp'
import './Banner.scss'

function Banner({ children, title, description, image }) {
    return (
        <>
            <section className='banner'>
                <img className='banner__image' src={image} alt={'Yeti bike'} />
                <div className='banner__container'>
                    <div className='banner__wrapper'>
                        <h3 className='banner__title'>{title}</h3>
                        <p className='banner__description'>{description}</p>
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner