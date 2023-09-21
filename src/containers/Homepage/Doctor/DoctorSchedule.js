import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { getDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import CommonUtils from '../../../utils/CommonUtils';

import HomeHeader from '../HomeHeader';
import './DoctorSchedule.scss';



class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            scheAvaiable: [],
        }

    }

    async componentDidMount() {
        await this.setState({
            allDays: CommonUtils.getAllDays(this.props.language)
        })

        const allDays = this.state.allDays;

        if (this.props.doctorIdFromParent && allDays && allDays.length > 0) {
            const doctorId = this.props.doctorIdFromParent;
            this.props.fetchDoctorScheduleByDateRedux(doctorId, allDays[0].value);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                allDays: CommonUtils.getAllDays(this.props.language)
            })
        }

        if (prevProps.doctorSchedule !== this.props.doctorSchedule) {
            this.setState({
                scheAvaiable: this.props.doctorSchedule
            })
        }
    }

    handleOnChangeScheduleDay = async (event) => {
        const doctorId = this.props.doctorIdFromParent;
        const date = event.target.value;
        if (doctorId) {
            this.props.fetchDoctorScheduleByDateRedux(doctorId, date);
        }
    }


    render() {
        const { language } = this.props;
        const { allDays, scheAvaiable } = this.state;
        return (
            <div className="doctor-schedule-container">
                <div className="schedule-day">
                    <select onChange={(event) => this.handleOnChangeScheduleDay(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => (
                                <option key={index}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            ))
                        }
                    </select>

                </div>
                <div className="schedule-time">
                    <div className="text-celendar">
                        <i className='fas fa-calendar-alt'></i>
                        <span>Calendar</span>
                    </div>
                    <div className="time-avaiable">
                        {scheAvaiable && scheAvaiable.length > 0 ?
                            <>
                                <div className="time-avaiable-btns">
                                    {
                                        scheAvaiable.map((item, index) => (
                                            <button key={index}>
                                                {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                            </button>
                                        ))
                                    }
                                </div>

                                <div className="book-free">
                                    Chọn <i className='far fa-hand-point-up'></i> và đặt miễn phí
                                </div>

                            </>
                            :
                            <h5>Bác sĩ không có lịch hẹn vào ngày này.</h5>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorSchedule: state.admin.doctorSchedule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorScheduleByDateRedux: (doctorId, date) => dispatch(actions.fetchDoctorScheduleById(doctorId, date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
