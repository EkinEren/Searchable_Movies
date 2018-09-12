import React from 'react';
import './css/App.css';
import { Card } from 'antd';

class CardItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <br />
                <Card
                    title={this.props.title}
                    style={{ width: 300 }}
                    className="well"
                    cover={<img src={this.props.poster} alt="Not available" />}
                >
                    <p>{this.props.year}</p>
                </Card>
                <br />
            </div>
        );
    }
}

export default CardItem;