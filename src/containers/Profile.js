import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { List, Skeleton } from 'antd';
import Result from '../components/Result'
import * as actions from '../store/actions/gradedAssignment'
import Hoc from '../hoc/hoc'



class Profile extends PureComponent {

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.onGetGradedAssignment(this.props.token, this.props.username)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.onGetGradedAssignment(newProps.token, newProps.username)
            }
        }
    }

    render() {
        return (
            <Hoc>
                {
                    this.props.loading ?
                        <Skeleton active /> :
                        <Hoc>
                            <h1>Hi {this.props.username}</h1>
                            <List
                                size="large"
                                dataSource={this.props.gradedAssignments}
                                renderItem={assgn => <Result key={assgn.id} grade={assgn.grade} />}
                            />
                        </Hoc>
                }

            </Hoc>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.username,
    gradedAssignments: state.gradedAssignment.assignments,
    loading: state.gradedAssignment.loading
})

const mapDispatchToProps = dispatch => {
    return {
        onGetGradedAssignment: (token, username) => dispatch(actions.getGradedAssignments(token, username))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)


