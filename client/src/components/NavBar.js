import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <nav>
                <div className="nav-wrapper white" style={{color: 'black'}}>
                    <Link to="/" className="brand-logo left">Nistagram</Link>
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/createpost">Create Post</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/signin">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;