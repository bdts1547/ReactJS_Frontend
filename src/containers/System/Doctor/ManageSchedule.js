import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';


import * as actions from '../../../store/actions';
import { LANGUAGES, DATE_FORMAT } from '../../../utils/constant';



class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            selectedDoctor: null,
            selectDate: null,
            schedule: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTimeRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctors !== this.props.listDoctors
            || prevProps.language !== this.props.language) {
            const listDoctors = this.props.listDoctors;
            const options = listDoctors.map((doctor, index) => {
                const fullName = this.props.language === LANGUAGES.VI ?
                    `${doctor.lastName} ${doctor.firstName}`
                    : `${doctor.firstName} ${doctor.lastName}`;
                return {
                    'value': doctor.id,
                    'label': fullName
                }
            })

            this.setState({
                listDoctors: options
            })
        }

        if (prevProps.scheduleTime !== this.props.scheduleTime) {
            // Creating a new field isSelected in order to trigger when time is selected
            const scheduleTime = this.props.scheduleTime.map((item) => ({...item, isSelected: false}))
            this.setState({
                schedule: scheduleTime,
            })
        }



    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        });

        // this.props.fetchDoctorByIdRedux(selectedOption.value);
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            selectDate: date
        })
    }

    handleClickBtnTime = (time) => {
        time.isSelected = !time.isSelected;
        this.setState({}) // re-render
    }

    handleSaveSchedule = () => {
        let isValid = true;
        const {schedule, selectDate, selectedDoctor} = this.state;
        const scheduleSelected = schedule.filter((item) => item.isSelected === true)
        
        if (!selectDate) {
            isValid = false;
            toast.error("Invalid date!");
        }

        if (!selectDate) {
            isValid = false;
            toast.error("Invalid doctor!");
        }

        if (!scheduleSelected || scheduleSelected.length === 0) {
            isValid = false;
            toast.error("Invalid schedule!");
        }
       
        const formatDate = new Date(selectDate[0]).getTime();
        // const formatDate = moment(new Date(selectDate[0])).startOf('day').valueOf();
        console.log(formatDate);
        if (isValid) {
            let data = scheduleSelected.map((item) => {
                let obj = {};
                obj.doctorId = selectedDoctor.value;
                obj.date = formatDate;
                obj.timeType = item.code
                return obj;
            })
            const result = {
                doctorId: selectedDoctor.value,
                formatDate: formatDate,
                listSchedule: data
            }
            this.props.bulkCreateScheduleRedux(result);
        }

    }



    render() {
        const { schedule } = this.state;

        return (
            <div className="manage-schedule-container">
                <div className="schedule-title">
                    Manage Schedule
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">Select doctor</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Select day</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.selectDate}
                                minDate={new Date().setHours(0,0,0,0)}
                            />
                        </div>
                        <div className="col-12 hours-container">
                            {schedule && schedule.length > 0 && 
                                schedule.map((item, index) => {
                                    return (
                                        <button key={index}
                                            className={item.isSelected === false ? 'btn btn-schedule' : 'btn btn-schedule active'} 
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button 
                                className="btn btn-primary btn-save"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctors: state.admin.doctors,
        scheduleTime: state.admin.scheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
        bulkCreateScheduleRedux: (data) => dispatch(actions.bulkCreateSchedule(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
