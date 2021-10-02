import React, { Component } from 'react'
import { Steps, Button, message } from 'antd';


const { Step } = Steps;

class Question extends React.Component {

    state = {
        current: 0,
    };

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }


    render() {
        const { current } = this.state;
        const { questions } = this.props
        return (
            <div style={{ height: "100%" }}>
                <Steps progressDot current={current}>
                    {questions.map((q, index) => (
                        <Step key={index} />
                    ))}
                </Steps>
                <div>{questions[current]}</div>
                <div>
                    {current < questions.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === questions.length - 1 && (
                        <Button type="primary" onClick={() => this.props.submit()}>
                            Submit
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default Question

