import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";


class MedicalFacility extends Component {



    render() {


        return (
            <div className="home-slider-content">
                <div className="section-share medical-facility">
                    <div className="section-header">
                        <h1 className='section-title'>Cơ sở y tế nổi bật</h1>
                        <a className='btn-more'>Tìm kiếm</a>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings} style={{ height: '100%' }}>
                            <div className="section-item">
                                <div className='item-customize'></div>
                                <h3 className='item-title'>Bệnh viện hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'>
                                </div>
                                <h3 className='item-title'>Bệnh viện hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'>
                                </div>
                                <h3 className='item-title'>Bệnh viện hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'>
                                </div>
                                <h3 className='item-title'>Bệnh viện hữu nghị Việt Đức</h3>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'>
                                </div>
                                <h3 className='item-title'>Bệnh viện hữu nghị Việt Đức</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
