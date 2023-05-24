import React from "react";
import "./Footer.scss"

const Footer = () => {
    return (
        <>
            <div className="footer-line"></div>
            <footer className="contact-top">
                <div className="contact-top__social">

                </div>
                <div className="contact">
                    <div className="contact__containers">
                        <h4 className="contact__management-name">Shop</h4>
                        <h4 className="contact__management-address">Components</h4>
                        <p className="contact__management-address">Bikes</p>
                        <p className="contact__management-address-bottom">Frames</p>
                        <p className="contact__management-email">Wheels</p>
                    </div>
                    <div className="contact__containers">
                        <h4 className="contact__management-name">Sales + Support</h4>
                        <p className="contact__management-address">Login
                        </p>
                        <p className="contact__management-address-bottom">Contact US</p>
                        <p className="contact__management-email">Privacy Policy</p>
                    </div>
                    <div className="contact__containers">
                        <h4 className="contact__management-name">About Us</h4>
                        <p className="contact__management-address">Careers
                        </p>
                        <p className="contact__management-address-bottom">Contact US</p>
                        <p className="contact__management-email">partsbin@partsbin.com</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;