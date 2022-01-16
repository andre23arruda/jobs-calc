import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'

// images and styles
import './Header.css'


function Header({ title }) {

    return (
        <header className="page-header inner">
            <div className="container animate-up">
                <Link to="/jobs" className="back">
                    <FiChevronLeft size={ 35 } color="#ccc"/>
                </Link>

                <h1>{ title }</h1>
            </div>
        </header>

    )
}

export default Header
