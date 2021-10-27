import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import UserHomeScreen from "./UserHomeScreen";
import UploadVideoScreen from "./UploadVideoScreen";

const UserScreen = ({ history }) => {
    const { userInfo } = useSelector(state => state.userLogin);
    const match = useRouteMatch();
    useEffect(() => {
        if (!userInfo) {
            history.push("/auth/login")
        }
    })

    return (<div>
        <Switch>
            <Route path={match.path} component={UserHomeScreen} exact/>
            <Route path={`${match.path}/upload`} component={UploadVideoScreen} />
        </Switch>
    </div>)
}

export default UserScreen;