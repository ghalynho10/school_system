import React, { Component } from 'react'
import { Card, Skeleton, message } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../store/actions/assignments'
import { createGradedAssignment } from '../store/actions/gradedAssignment'
import Question from './Question'
import Hoc from '../hoc/hoc'
import Choices from '../components/Choices'




export class AssignmentDetail extends Component {

    state = {
        userAnswers: {}
    }

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.onGetAssignmentDetail(this.props.token, this.props.match.params.id)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.onGetAssignmentDetail(newProps.token, newProps.match.params.id)
            }
        }
    }

    onChange = (e, qId) => {
        const { userAnswers } = this.state
        userAnswers[qId] = e.target.value
        console.log('radio checked', e.target.value);
        this.setState({
            userAnswers: userAnswers
        });
    };

    handleSubmit = () => {
        message.success('Submitting your assignment!')

        const assignment = {
            username: this.props.username,
            assignmentId: this.props.currentAssignment.id,
            answers: this.state.userAnswers
        }
        console.log(assignment);

        this.props.onCreateGradedAssignment(this.props.token, assignment)
        this.props.history.push(`/profile/${this.props.userId}`)
    }

    render() {
        const { currentAssignment } = this.props
        const { title } = this.props.currentAssignment
        const { userAnswers } = this.state

        return (
            <Hoc>
                {
                    Object.keys(currentAssignment).length > 0 ?
                        <Hoc>
                            {
                                this.props.loading ?
                                    <Skeleton active />
                                    :
                                    <Card title={title}>
                                        <Question submit={() => this.handleSubmit()} questions={currentAssignment.questions.map(question => {
                                            return (
                                                <Card
                                                    style={{ marginTop: '20px', marginBottom: '20px' }}
                                                    type="inner"
                                                    key={question.id}
                                                    title={`${question.order}. ${question.question}`}
                                                >
                                                    <Choices
                                                        questionId={question.order}
                                                        choices={question.choices}
                                                        userAnswers={userAnswers}
                                                        change={this.onChange}
                                                    />
                                                </Card>)
                                        })} />
                                    </Card>
                            }
                        </Hoc>
                        : null
                }
            </Hoc>

        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    currentAssignment: state.assignments.currentAssignment,
    loading: state.assignments.loading,
    userId: state.auth.userId,
    username: state.auth.username
})

const mapDispatchToProps = dispatch => {
    return {
        onGetAssignmentDetail: (token, id) => dispatch(actions.getAssignmentDetail(token, id)),
        onCreateGradedAssignment: (token, assignment) => dispatch(createGradedAssignment(token, assignment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetail)

