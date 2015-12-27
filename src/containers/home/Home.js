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
                    <Col span="24">
                        <Carousel afterChange={this.onChange}>
                            <div><h3>1</h3></div>
                            <div><h3>2</h3></div>
                            <div><h3>3</h3></div>
                            <div><h3>4</h3></div>
                        </Carousel>
                    </Col>
                </Row>
            </div>
        );
    }
}
