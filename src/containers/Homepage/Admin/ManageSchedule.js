import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import *  as userService from '../../../services/userService';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_action } from '../../../utils/constant';

import './ManageDoctor.scss';

import { toast } from 'react-toastify';



class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      

    }




    render() {

        return (
            <div>schedule</div>
        )
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
