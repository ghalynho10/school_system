import React from 'react'
import { Form, Input, Button, Spin } from 'antd';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


class Login extends React.Component {

    onFinish = values => {
        this.props.onAuth(values.username, values.password)
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };




    render() {

        if (this.props.token !== null) {
            return <Redirect to="/" />
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        return (

            < div >
                {errorMessage}
                {
                    this.props.loading ?
                        <Spin indicator={antIcon} />
                        :
                        <Form
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Login
                        </Button>
                            OR
                        <NavLink style={{ marginRight: '10px' }}
                                    to='/signup'>  Signup
                        </NavLink>
                            </Form.Item>
                        </Form>
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))





