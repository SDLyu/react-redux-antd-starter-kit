import React, {Component} from 'react';
import { Row, Col, Steps, Carousel } from 'antd';

import './home.css';

export default class Home extends Component {

    onChange(a, b, c) {
        console.log(a, b, c);
    }

    render() {
        const Step = Steps.Step;


        return (
            <div>
                <Row>
                </Row>
            </div>
        );
    }
}
