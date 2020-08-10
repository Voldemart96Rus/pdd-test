import React from 'react';

import './Header.css';

function Header({username}) {
    return (
        <header className="header-wrapper">
            <div className="container">
                <div className="header">
                    <a href="/" className="link-home">
                        Начать заново{' '}
                    </a>
                    {username && (
                        <div>
                            <span className="hide-mobile">Пользователь: </span>
                            <span className="username">{username}</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
