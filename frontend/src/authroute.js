import React from 'react';
import {connect} from "react-redux";
import { Navigate } from 'react-router-dom';

export const AuthRoute = ({ element: Component, authenticated }) => {    
    if (authenticated !== null && authenticated !== "" && authenticated !== undefined) {
        return (<Component/>)
    } else {
       return (<Navigate to="/login" replace />)
    }
    
};

const mapStateToProps = state => ({
    authenticated: state.data.get("user").get("id")
});

export default connect(mapStateToProps, null)(AuthRoute);