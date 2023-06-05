import { useRef } from 'react';
import { useNavigate } from 'react-router';
import './SideScroll.scss';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';


function SideScroll({ children, title }) {

    const sliderRef = useRef(null);

    const navigate = useNavigate();

    function scrollRight() {
        let scrollAmount = 400;
        let maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        //conditional to scroll to start once it reaches the end
        if (sliderRef.current.scrollLeft + scrollAmount >= maxScrollLeft) {
            sliderRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            sliderRef.current.scrollTo({
                left: sliderRef.current.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    function scrollLeft() {
        let scrollAmount = 400;
        
        sliderRef.current.scrollTo({
            left: sliderRef.current.scrollLeft - scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section>
            <div className='side-scroll'>
                <h3 className='side-scroll__title'>{title}</h3>
                <div className='side-scroll__space'> </div>
                <button className='side-scroll__button-left' onClick={scrollLeft}>
                    <ArrowLeftOutlined />
                </button>
                <button className='side-scroll__button-right' onClick={scrollRight}>
                    <ArrowRightOutlined />
                </button>
                <button className='side-scroll__button-link' onClick={() => navigate('/bikes')} >
                    View All
                </button>
            </div>

            <div className='side-scroll__container' ref={sliderRef}>
                <div className='side-scroll__container-inner'>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default SideScroll