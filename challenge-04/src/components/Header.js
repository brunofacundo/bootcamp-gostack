import React from 'react';

import './Header.css';
import facebook_logo from '../assets/facebook_logo.png';

function Header() {
    return (
        <header>
            <div className="header-container">
                <img src={facebook_logo} />
                <div>
                    <span>Meu perfil</span>
                    <i className="material-icons">account_circle</i>
                </div>
            </div>
        </header>
    );
}

export default Header;
