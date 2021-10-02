import React from 'react'
import { Form, Input, Button, Select } from 'antd';
import * as actions from '../store/actions/auth'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';


const Signup = (props) => {

    const [form] = Form.useForm();
    const { Option } = Select

    const onFinish = values => {
        // console.log('Received values of form: ', values);
        let is_student = false
        if (values.userType === "student") is_student = true

        props.onAuth(values.username, values.email, values.password, values.confirm, is_student)
        // props.history.push('/')
        console.log(is_student)
    };

    return (
        <div>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    name="userType"
                    rules={[
                        {
                            required: true,
                            message: 'Please select user!',
                        },
                    ]}
                >
                    <Select placeholder="Select a user type" >
                        <Option value="student" >Student</Option>
                        <Option value="teacher" >Teacher</Option>
                    </Select>

                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                        Signup
                        </Button>
                            OR
                        <NavLink style={{ marginRight: '10px' }}
                        to='/login/'>  Login
                        </NavLink>
                </Form.Item>
            </Form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2, is_student) => dispatch(actions.authSignup(username, email, password1, password2, is_student))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

