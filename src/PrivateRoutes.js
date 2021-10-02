import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const user = JSON.parse(localStorage.getItem('user'))

const PrivateRoute = ({ component: Component, token, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (user.token !== null) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/login/" />;
                }
            }}
        />
    );
};

export const RouteTeacher = ({ component: Component, token, is_teacher, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (user) {
                    if (user.token && user.is_teacher) {
                        return <Component {...props} />;
                    } else if (user.is_teacher === false) {
                        return <Redirect to="/" />;
                    }
                    else {
                        return <Redirect to="/login/" />;
                    }
                }
                else {
                    return <Redirect to="/login/" />;
                }
            }}
        />
    );
};

const mapStateToProps = state => ({
    token: state.auth.token,
    is_teacher: state.auth.is_teacher
});

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(PrivateRoute);
