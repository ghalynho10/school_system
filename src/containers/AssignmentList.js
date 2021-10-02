import React, { Component, PureComponent } from 'react'
import { List, Skeleton, Divider } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../store/actions/assignments'
import Hoc from '../hoc/hoc'
import { Link, Redirect } from 'react-router-dom'

export class AssignmentList extends PureComponent {

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.onGetAssignments(this.props.token)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.onGetAssignments(newProps.token)
            }
        }
    }

    renderItem = (item) => {
        return (
            <Link to={`/assignments/${item.id}`}>
                <List.Item>{item.title}</List.Item>
            </Link>
        )
    }

    render() {
        if (!this.props.isAuthenticated && !this.props.authLoading) {
            return <Redirect to='/login' />
        }

        let assignList = <Skeleton active />

        if (!this.props.loading) {
            assignList = <div>
                <Divider orientation="left">Assignment List</Divider>
                <List
                    size="large"
                    bordered
                    dataSource={this.props.assignments}
                    renderItem={item => this.renderItem(item)}
                />
            </div>
        }


        return (
            <Hoc>
                {assignList}
            </Hoc>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    assignments: state.assignments.assignments,
    loading: state.assignments.loading,
    isAuthenticated: state.auth.token !== null,
    authLoading: state.auth.loading
})

const mapDispatchToProps = dispatch => {
    return {
        onGetAssignments: (token) => dispatch(actions.getAssignments(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList)