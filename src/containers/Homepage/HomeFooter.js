import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";


class HomeFooter extends Component {



    render() {

        return (
            <div className="home-footer">
                <div className="footer-desc">
                    <span>&copy; 2023 HealthCareBooking </span>
                    <span>Nguyễn Hải Đăng - Email: nguyendang1547@gmail.com</span>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
