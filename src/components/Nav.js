import React, { useEffect } from 'react'
import './Nav.css'

export default function Nav() {
    const [show, handleShow] = React.useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50){
                handleShow(true);    
            } else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", () => {})
        };
    }, []);

  return (
    <nav className={`nav ${show && "nav__black"}` }>
        <img
            alt="Netflix logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
            className="nav__logo"
            onClick={() => window.location.reload()}
        />
        <img
            alt="User loggend"
            src ="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            className="nav__avatar"
        />

    </nav>
  )
}
