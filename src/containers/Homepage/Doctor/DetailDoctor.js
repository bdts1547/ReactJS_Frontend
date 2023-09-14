import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { getDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

import HomeHeader from '../HomeHeader';
import './DetailDoctor.scss';



class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: null,
        }

    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchDoctorByIdRedux(id)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                doctor: this.props.detailDoctor,
            })
        }
    }


    render() {
        const { language } = this.props;
        const doctor = this.state.doctor;
        console.log('detail', doctor)

        let imageBinary, contentHTML;
        if (doctor && doctor.image) {
            imageBinary = new Buffer(doctor.image, 'base64').toString('binary');
        }
        if (doctor && doctor.markdown && doctor.markdown.contentHTML) {
            contentHTML = doctor.markdown.contentHTML;
        }

        console.log(contentHTML)
        return (
            <>
                <HomeHeader
                    isOpenBanner={false}
                />
                {doctor &&

                    <div className="detail-doctor-container">
                        <div className="detail-doctor-header">
                            <div className="doctor-navigate my-3">
                                <i className="fas fa-home"></i>&nbsp;
                                / Khám chuyên khoa / Sức khỏe tâm thần Tư vấn - trị liệu Tâm lý
                            </div>
                            <div className="doctor-header">
                                <div className="doctor-img"
                                    style={{ backgroundImage: `url(${imageBinary})` }}>
                                </div>
                                <div className="doctor-intro">
                                    <h1 className="doctor-title">
                                        {language === LANGUAGES.VI ?
                                            `${doctor.positionData.valueVi} ${doctor.lastName} ${doctor.firstName}`
                                            : `${doctor.positionData.valueEn} ${doctor.firstName} ${doctor.lastName}`}
                                    </h1>
                                    <p className="doctor-desc">
                                        {doctor.markdown && doctor.markdown.description}
                                    </p>
                                </div>
                            </div>
                            <div className="doctor-schedule">
                                Schedule
                            </div>
                        </div>
                        <div className="detail-doctor-body">
                            <div className="doctor-contentHTML">
                                <div dangerouslySetInnerHTML={{ __html: contentHTML }}></div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.doctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorByIdRedux: (id) => dispatch(actions.fetchDoctorById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
