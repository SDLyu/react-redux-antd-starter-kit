import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import './googlemap.css';

export default React.createClass({
    propTypes: {
        
    },

    getDefaultProps() {
        return {
            height: 400,
            initialZoom: 18,
            lat: 25.047924,
            lon: 121.517065,
        };
    },

    componentDidMount() {
        const {initialZoom, lat, lon} = this.props;
        let center = new google.maps.LatLng(lat, lon);
        let mapOptions = {
            center: center,
            zoom: initialZoom
        };
        let map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);
        let marker = new google.maps.Marker({position: center, map: map});

        this.setState({map: map});
    },

    render() {
        const {height, width} = this.props;

        return (
            <div className="google-map" style={{'height': height, 'width': '100%'}}>
            </div>
        );
    }
});
