import React from 'react'
import { Link } from 'react-router-dom'
import './UserScreen.css'

const UserHomeScreen = () => {
    return (
        <div>
            <span className="btn-label">Upload Your videos from here : </span><Link to="/user/upload"><button className="btn login_btn">Upload</button></Link>
        </div>
    )
}

export default UserHomeScreen
