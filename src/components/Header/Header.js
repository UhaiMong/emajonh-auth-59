import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../Context/UserContext';
import './Header.css';

const Header = () => {
    const { user,logOut } = useContext(AuthContext);
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <p className='user-info'>{user?.email}</p>
            <div className='nav-container'>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>

                {
                    user?.uid ?
                    <button onClick={logOut} className='btn-logout'>Logout</button>
                    :
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </>
                }
                
            </div>
        </nav>
    );
};

export default Header;