import React, { Component } from 'react'

import { Form, Input, Button, Divider, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import QuestionForm from './QuestionForm'
import Hoc from '../hoc/hoc';
import { connect } from 'react-redux'
import * as actions from '../store/actions/assignments'



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        lg: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 10 },
        sm: { span: 20, offset: 4 },
        lg: { span: 20, offset: 2 },
    },
};


class AssignmentCreate extends Component {

    state = {
        formCount: 1,
        values: null
    }

    removing = () => {
        const { formCount } = this.state
        this.setState({ formCount: formCount - 1 })
    }

    adding = () => {
        const { formCount } = this.state
        this.setState({ formCount: formCount + 1 })
    }

    onFinish = values => {
        console.log('Received values of form:', '\n', Object.keys(values).length, '\n', values)
        const questions = []
        const length = ((Object.keys(values).length - 1) / 3)
        let isValid = true

        for (let i = 0; i < length; i++) {
            questions.push({
                title: values[`question${i}`],
                choices: (values[`choices${i}`] !== undefined ? Object.values(values[`choices${i}`]).filter(el => el !== null) : "null"),
                answer: values[`answer${i}`]
            })

        }

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].choices === "null") {
                message.error(`Please add at least a choice field for Question ${i + 1}`, 5)
                isValid = false
            } else if (!questions[i].choices.includes(questions[i].answer)) {
                message.error(`Please add the correct answer to the choice field of Question ${i + 1}`, 5)
                isValid = false
            }
        }

        console.log(questions)
        console.log(isValid)

        const assignment = {
            teacher: this.props.username,
            title: values.Title,
            questions
        }

        if (isValid) {
            this.props.onCreateAssignment(this.props.token, assignment)
        }
    };
    render() {

        const questions = []

        for (let i = 0; i < this.state.formCount; i++) {
            questions.push(
                <Hoc key={i} >
                    {questions.length > 0 ? (
                        <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                this.removing();
                            }}
                        />
                    ) : null}
                    <QuestionForm id={i} {...this.props} />
                    <Divider />
                </Hoc>
            )
        }

        return (
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={this.onFinish}>
                <h1>Create an assignment</h1>
                <Form.Item
                    {...formItemLayout}
                    label={"Title: "}
                    name="Title"
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                        {
                            required: true,
                            message: "Please input a title or delete this field.",
                        },
                    ]}
                >
                    <Input placeholder="Add a title" />
                </Form.Item>
                {questions}
                <Form.Item>
                    <Button
                        type="dashed"
                        onClick={() => {
                            this.adding();
                        }}
                    >
                        <PlusOutlined /> Add question
                                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form >
        );
    }
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
    username: state.auth.username,
    loading: state.assignments.loading
})

const mapDispatchToProps = dispatch => {
    return {
        onCreateAssignment: (token, assignment) => dispatch(actions.createAssignment(token, assignment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentCreate)
