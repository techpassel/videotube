import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';

const HomeScreen = () => {
    const history = useHistory();
    const userLogin = useSelector((state) => state.userLogin);
    useEffect(() => {
        if(!userLogin || !userLogin.userInfo)   history.push("/auth/login");
    }, [history, userLogin])
    return (
        <div>
            <h1>Welcome to Home page.</h1>
        </div>
    )
}

export default HomeScreen
