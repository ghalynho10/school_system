import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { connect } from 'react-redux'
import BaseRouter from './baseroutes'
import { BrowserRouter as Router } from 'react-router-dom'

import * as actions from './store/actions/auth'
import CustomLayout from './containers/Layout'

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup()
    }

    render() {
        return (
            <div>
                <Router>
                    <CustomLayout {...this.props}>
                        <BaseRouter />
                    </CustomLayout>
                </Router>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
