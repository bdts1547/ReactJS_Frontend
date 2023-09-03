import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Slider from "react-slick";


class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
        }
    }

    componentDidMount() {
        this.props.fetchTopDoctorRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorRedux !== this.props.doctorRedux) {
            this.setState({
                topDoctors: this.props.doctorRedux,
            })
        }
    }


    render() {
        let { topDoctors } = this.state;
        topDoctors = topDoctors.concat(topDoctors).concat(topDoctors);

        return (
            <div className="home-slider-content">
                <div className="section-share outstanding-doctor">
                    <div className="section-header">
                        <h1 className='section-title'>Bác sĩ nổi bật tuần qua</h1>
                        <a className='btn-more'>Tìm kiếm</a>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings} style={{ height: '100%' }}>
                            {topDoctors && topDoctors.length > 0 &&
                                topDoctors.map((doctor, index) => {
                                    return (
                                        <div className="section-item" key={index}>
                                            <div className='item-customize'></div>
                                            <div className='item-title'>{doctor.firstName} - {doctor.lastName}</div>
                                            <div className='item-subtitle'>{doctor.positionData.valueVi}</div>
                                        </div>
                                    )
                                })

                            }



                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctorRedux: state.admin.doctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
