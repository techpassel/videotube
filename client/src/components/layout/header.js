import '../../App.css';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../images/video.png';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userAction'
import { useHistory, useLocation } from 'react-router-dom';

const Header = (props) => {
    const { userInfo } = useSelector((state) => state?.userLogin);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation().pathname;
    const userAuth = () => {
        if (userInfo) {
            dispatch(logout())
        } else {
            history.push(`/auth${location.includes('/auth/login') ? '' : '/login'}`)
        }
    }

    const [searchOptions, setSearchOptions] = useState([]);

    const performSearch = (e) => {
        let currentValue = e.target.value?.trim();
        if (!('data' in e.nativeEvent)) {
            findMatchingItems(currentValue);
        } else {
            //This is temporary implementation.Will complete actual implementation later.
            const tempOptions = ['apple', 'aman', 'banana', 'berry', 'alphanso', 'car', 'cat', 'cherry']
            const currentInputMatch = tempOptions.filter(e => e.includes(currentValue))
            setSearchOptions(currentInputMatch)
        }
    }

    const findMatchingItems = (val) => {
        //This is temporary implementation.Will complete actual implementation later.
        //Here we will send request to server and find all items matching the searched value.
        console.log(val, "Item is searched");
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-logo">
            <div className="container-fluid">
                <Link className="navbar-brand logo" to="/">
                    <img src={logo} alt="Videotube logo" className="d-inline-block align-text-top" />
                    <span className="logo-text text-coral align-text-top ms-1">Videotube</span>
                </Link>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/">Action</Link></li>
                                <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                            </ul>
                        </li>

                    </ul>
                    <span className="d-flex me-5">
                        <input className="form-control " list="datalistOptions" id="exampleDataList" placeholder="Search..." onInput={e => performSearch(e)} onKeyPress={e => { if (e.key === 'Enter') { findMatchingItems(e.target.value) } }} />
                        <datalist id="datalistOptions">
                            {searchOptions.map((e, i) => <option value={e} key={i} />)}
                        </datalist>
                    </span>
                    <button className="btn btn-outline-success" id="header-serach-btn" type="submit" onClick={userAuth}>{userInfo ? 'Logout' : location.includes('/auth/login') ? 'Signup' : 'Login'}</button>
                </div>
            </div>
        </nav>
    )
}

export default Header
