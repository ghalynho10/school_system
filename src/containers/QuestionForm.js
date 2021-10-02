import React, { Component } from 'react'

import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Hoc from '../hoc/hoc'


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
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
        lg: { span: 20, offset: 2 },
    },
};


class QuestionForm extends Component {


    render() {
        return (
            // <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={this.onFinish}>
            <Hoc>
                <Form.Item
                    {...formItemLayout}
                    label={"Question: "}
                    name={`question${this.props.id}`}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                        {
                            required: true,
                            message: "Please input a question.",
                        },
                    ]}
                >
                    <Input placeholder="Add a question" />
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label={"Answer: "}
                    name={`answer${this.props.id}`}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                        {
                            required: true,
                            message: "Please input an answer to this question.",
                        },
                    ]}
                >
                    <Input placeholder="What is the answer?" />
                </Form.Item>
                <Form.List name={`choices${this.props.id}`}>
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Choices' : ''}
                                        required={true}
                                        key={field.key}

                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input an answer choice to the question.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="Answer choice" />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    console.log(field.name);

                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            console.log(fields);
                                            console.log(this.props.id)
                                            add();
                                        }}
                                        style={{ width: '60%' }}
                                    >
                                        <PlusOutlined /> Add an answer choice
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

                {/* <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
                {/* // </Form> */}
            </Hoc>
        );
    }
};

export default QuestionForm
