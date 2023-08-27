import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Speciality.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Speciality extends Component {



    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div className='home-slider-container'>
                <div className="home-slider-content">
                    <section className="section-speciality">
                        <div className="speciality-header">
                            <h1 className='speciality-title'>Chuyên khoa phổ biến</h1>
                            <a className='btn-more'>Xem thêm</a>
                        </div>
                        <div className="speciality-body">
                            <Slider {...settings} style={{ height: '100%' }}>
                                <div className="speciality-item">
                                    <div className='customize-img'></div>
                                    <h3 className='speciality-title'>Cơ xương khớp</h3>
                                </div>
                                <div className="speciality-item">
                                    <div className='customize-img'>
                                    </div>
                                    <h3 className='speciality-title'>Cơ xương khớp</h3>
                                </div>
                                <div className="speciality-item">
                                    <div className='customize-img'>
                                    </div>
                                    <h3 className='speciality-title'>Cơ xương khớp</h3>
                                </div>
                                <div className="speciality-item">
                                    <div className='customize-img'>
                                    </div>
                                    <h3 className='speciality-title'>Cơ xương khớp</h3>
                                </div>
                                <div className="speciality-item">
                                    <div className='customize-img'>
                                    </div>
                                    <h3 className='speciality-title'>Cơ xương khớp</h3>
                                </div>
                               
                            </Slider>
                        </div>
                    </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
