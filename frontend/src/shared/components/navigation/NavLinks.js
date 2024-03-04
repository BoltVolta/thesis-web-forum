import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/topics" exact>Topics</NavLink>
        </li>

        {auth.isLoggedIn && (
            <li>
                <NavLink to="/topics/new">New Topic</NavLink>
            </li>
        )}

        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth">Login</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>Logout</button>
            </li>
        )}
    </ul>
};

export default NavLinks;