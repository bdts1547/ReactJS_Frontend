import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import *  as userService from '../../../services/userService';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_action } from '../../../utils/constant';

import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { toast } from 'react-toastify';




const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
            contentHTML: "",
            contentMD: "",
            description: "",
            selectedOption: "",
            options: [],
            action: CRUD_action.CREATE,
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorsRedux !== this.props.doctorsRedux
            || prevProps.language !== this.props.language) {
            const doctorsRedux = this.props.doctorsRedux;
            const options = doctorsRedux.map((doctor, index) => {
                const fullName = this.props.language === LANGUAGES.VI ?
                    `${doctor.lastName} ${doctor.firstName}`
                    : `${doctor.firstName} ${doctor.lastName}`;
                return {
                    'value': doctor.id,
                    'label': fullName
                }
            })

            this.setState({
                options: options
            })
        }

        if (prevProps.doctorRedux !== this.props.doctorRedux) {
            const doctor = this.props.doctorRedux;
            this.setState({
                contentHTML: doctor.markdown && doctor.markdown.contentHTML ? doctor.markdown.contentHTML : "",
                contentMD: doctor.markdown && doctor.markdown.contentMD ? doctor.markdown.contentMD : "",
                description: doctor.markdown && doctor.markdown.description ? doctor.markdown.description : "",
                action: doctor.markdown.description || doctor.markdown.contentHTML || doctor.markdown.contentMD ? CRUD_action.EDIT : CRUD_action.CREATE,
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMD: text,
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedOption
        });

        this.props.fetchDoctorByIdRedux(selectedOption.value);
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    validateDetailDoctor = () => {
        let isValid = true;
        const fields = ['contentHTML', 'contentMD', 'description']
        let errMessage = "Missing required parameters: ";
        for (let i = 0; i < fields.length; i++) {
            if (!this.state[fields[i]]) {
                isValid = false;
                errMessage += fields[i] + ", "
            }
        }

        if (!isValid) toast.error(errMessage.slice(0, -2));

        return isValid;
    }

    handleSaveDoctor = () => {
        if (!this.validateDetailDoctor()) {
            return;
        }


        switch (this.state.action) {
            case CRUD_action.CREATE:
                this.props.createDetailDoctorRedux({
                    contentHTML: this.state.contentHTML,
                    contentMD: this.state.contentMD,
                    description: this.state.description,
                    doctorId: this.state.selectedOption.value,
                })
                break;

            case CRUD_action.EDIT:
                this.props.editDetailDoctorRedux({
                    contentHTML: this.state.contentHTML,
                    contentMD: this.state.contentMD,
                    description: this.state.description,
                    doctorId: this.state.selectedOption.value,
                })
                break;


            default:
                break;
        }


    }


    render() {

        return (
            <div className="manage-doctor-container mx-5">
                <div className="manage-doctor-header my-5">
                    <h1 className='text-center'>Create Detail Information Doctor</h1>
                    <div className="infor-select form-group mt-5">
                        <div className="doctor-select">
                            <label htmlFor="">Doctor</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.options}
                            />

                        </div>

                        <div className="doctor-desc">
                            <label htmlFor="">Description</label>
                            <textarea className='form-control' rows="4" value={this.state.description}
                                onChange={(event) => this.handleOnChangeDesc(event)} />
                        </div>

                    </div>
                </div>
                <div className="manage-doctor-markdown">

                    <MdEditor
                        value={this.state.contentMD}
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>

                <div className="btn btn-primary my-3 px-5"
                    onClick={() => this.handleSaveDoctor()}>Save</div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorsRedux: state.admin.doctors,
        doctorRedux: state.admin.doctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchDoctorByIdRedux: (id) => dispatch(actions.fetchDoctorById(id)),
        createDetailDoctorRedux: (data) => dispatch(actions.createDetailDoctor(data)),
        editDetailDoctorRedux: (data) => dispatch(actions.editDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
