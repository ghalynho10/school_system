import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom'


import { connect } from 'react-redux'
import * as actions from '../store/actions/auth'

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

    logoutHandler = () => {
        this.props.logout()
        this.props.history.push("/login")
    }

    render() {

        const Logo = {
            width: '120px',
            height: '31px',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '16px 24px 16px 0',
            float: 'left'
        }

        return (
            <Layout className="layout" >
                <Header>
                    <div style={Logo} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >

                        {
                            this.props.token !== null ?
                                <Menu.Item key="2" onClick={this.logoutHandler}>
                                    Logout
                                </Menu.Item>
                                :
                                <Menu.Item key="2">
                                    <Link to="/login">Login</Link>
                                </Menu.Item>
                        }

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        {
                            this.props.token !== null ?
                                <Breadcrumb.Item>
                                    <Link to={`/profile/${this.props.userId}`}>Profile</Link>
                                </Breadcrumb.Item>
                                :
                                null
                        }
                        {
                            this.props.token !== null && this.props.is_teacher ?
                                <Breadcrumb.Item>
                                    <Link to={`/create/`}>Create Assignment</Link>
                                </Breadcrumb.Item>
                                :
                                null
                        }
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: '24px', minHeight: '280px' }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>

        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        is_teacher: state.auth.is_teacher
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (username, password) => dispatch(actions.authLogout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout))






