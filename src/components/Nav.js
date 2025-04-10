import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
    const [show, handleShow] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const navigate=useNavigate();

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

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

  return (
    <nav className={`nav ${show && "nav__black"}` }>
        <img
            alt="Netflix logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
            className="nav__logo"
            onClick={() => window.location.reload()}
        />

        <input 
            value={searchValue}
            onChange={handleChange}
            className="nav__input"
            type="text"
            placeholder="검색어를 입력하세요."
        />

        <img
            alt="User loggend"
            src ="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            className="nav__avatar"
        />

    </nav>
  )
}
