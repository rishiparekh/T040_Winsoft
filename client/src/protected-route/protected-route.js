import React, { useCallback } from 'react';
import useStore from '../zustand/store';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    const loggedIn = useStore(useCallback(state => state.loggedIn, []))
    return(
        <Route 
            {...rest}
            render = {props => 
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default ProtectedRoute;