import React, {Fragment,useContext} from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const {logout, isAuthenticated, user} = authContext;
    const {clearContacts} = contactContext;

    const onLogOut = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <li>Hi, {user && user.name}</li>
            <li><a href="#!" onClick={onLogOut}> <i className="fa fa-sign-out-alt" aria-hidden="true"></i>{" "} <span className="hide-sm">LogOut</span></a></li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </Fragment>
    )
    return (
        <nav className="navbar bg-primary">
            <h1 className="logo">
                <i className={icon}></i>
                 {title}</h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>

        </nav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: " ContactKeeper",
    icon: "fas fa-id-card-alt"
}

export default Navbar; 
