import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import { setCookie } from '../utils/CookiesHelper';

const NavBar = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    /**
     * users SignOut Handler
     */
    const handleSignOut = () => {
        setCookie('user_token', null, 365)
        setCookie('user_data', null, 365)

        dispatch({ type: "CLEAR" })
        history.push('/signin')
    }

    const renderList = () => {
        if (state) {
            return [
                <li key={Date.now()}><Link to="/createpost">Create Post</Link></li>,
                <li key={Date.now()}><Link to="/profile">Profile</Link></li>,
                <li key={Date.now()}>
                    <button className="btn waves-effect red"
                        onClick={handleSignOut}
                    >
                        Logout
                    </button>
                </li>
            ]
        } else {
            return [
                <li key={Date.now()}><Link to="/signin">Signin</Link></li>,
                <li key={Date.now()}><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper white" style={{ color: 'black' }}>
                    <Link to={state ? '/' : '/signin'} className="brand-logo left">Nistagram</Link>
                    <ul id="nav-mobile" className="right">
                        {renderList()}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;