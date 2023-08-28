import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick";


class OutstandingDoctor extends Component {



    render() {


        return (
            <div className="home-slider-content">
                <div className="section-share outstanding-doctor">
                    <div className="section-header">
                        <h1 className='section-title'>Bác sĩ nổi bật tuần qua</h1>
                        <a className='btn-more'>Tìm kiếm</a>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings} style={{ height: '100%' }}>
                            <div className="section-item">
                                <div className='item-customize'></div>
                                <div className='item-title'>Bác sĩ chuyên khoa II Trần Minh</div>
                                <div className='item-subtitle'>Sức khỏe tâm thần</div>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'></div>
                                <div className='item-title'>Bác sĩ chuyên khoa II Trần Minh</div>
                                <div className='item-subtitle'>Sức khỏe tâm thần</div>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'></div>
                                <div className='item-title'>Bác sĩ chuyên khoa II Trần Minh</div>
                                <div className='item-subtitle'>Sức khỏe tâm thần</div>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'></div>
                                <div className='item-title'>Bác sĩ chuyên khoa II Trần Minh</div>
                                <div className='item-subtitle'>Sức khỏe tâm thần</div>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'></div>
                                <div className='item-title'>Bác sĩ chuyên khoa II Trần Minh</div>
                                <div className='item-subtitle'>Sức khỏe tâm thần</div>
                            </div>
                            <div className="section-item">
                                <div className='item-customize'></div>
                                <div className='item-title'>Bác sĩ chuyên khoa II Trần Minh</div>
                                <div className='item-subtitle'>Sức khỏe tâm thần</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
