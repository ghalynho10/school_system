import React, { Component } from 'react'

import { Radio } from 'antd';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class Choices extends Component {

    render() {

        // const { value } = this.state;
        const { questionId } = this.props
        const { userAnswers } = this.props

        return (
            <Radio.Group
                onChange={(e, qId) => this.props.change(e, questionId)}
                value={
                    userAnswers[questionId] !== undefined &&
                        userAnswers[questionId] !== null
                        ? userAnswers[questionId]
                        : null
                }
            >
                {this.props.choices.map((choice, index) => {
                    return (
                        <Radio style={radioStyle} value={choice} key={index}>
                            {choice}
                        </Radio>
                    )
                })}

            </Radio.Group>
        );
    }
}


export default Choices
