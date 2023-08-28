import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";


class Speciality extends Component {



    render() {
        

        return (
                <div className="home-slider-content">
                    <div className="section-share speciality">
                        <div className="section-header">
                            <h1 className='section-title'>Chuyên khoa phổ biến</h1>
                            <a className='btn-more'>Xem thêm</a>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings} style={{ height: '100%' }}>
                                <div className="section-item">
                                    <div className='item-customize'></div>
                                    <h3 className='item-title'>Cơ xương khớp</h3>
                                </div>
                                <div className="section-item">
                                    <div className='item-customize'>
                                    </div>
                                    <h3 className='item-title'>Cơ xương khớp</h3>
                                </div>
                                <div className="section-item">
                                    <div className='item-customize'>
                                    </div>
                                    <h3 className='item-title'>Cơ xương khớp</h3>
                                </div>
                                <div className="section-item">
                                    <div className='item-customize'>
                                    </div>
                                    <h3 className='item-title'>Cơ xương khớp</h3>
                                </div>
                                <div className="section-item">
                                    <div className='item-customize'>
                                    </div>
                                    <h3 className='item-title'>Cơ xương khớp</h3>
                                </div>
                               
                            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
