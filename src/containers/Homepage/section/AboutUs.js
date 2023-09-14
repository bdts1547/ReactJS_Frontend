import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";


class AboutUs extends Component {



    render() {

        return (
            <div className="home-slider-content">
                <div className="section-share about-us">
                    <div className="section-header">
                        <h1 className='section-title'>Truyền thông nói về BookingCare</h1>
                    </div>

                    <div className="section-body">
                        <iframe width="570"
                            height="321"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                        <div className="social-logo">
                            Logo
                        </div>
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
