import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { LANGUAGES, CRUD_action, CommonUtils } from '../../../utils';
import TableManageUser from './TableManageUser';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderData: [],
            positionData: [],
            roleData: [],
            previewImgAvatar: '',
            isOpenImagePreview: false,

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            gender: '',
            roleId: '',
            positionId: '',
            phoneNumber: '',
            image: '',

            action: CRUD_action.CREATE,
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            const genders = this.props.genderRedux;
            this.setState({
                genderData: genders,
                gender: genders && genders.length > 0 ? genders[0].key : '', // Get value default
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            const positions = this.props.positionRedux;
            this.setState({
                positionData: positions,
                positionId: positions && positions.length > 0 ? positions[0].key : '',
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            const roles = this.props.roleRedux;
            this.setState({
                roleData: roles,
                roleId: roles && roles.length > 0 ? roles[0].key : '',
            })
        }

        // Update after create || edit
        if (prevProps.listUsers !== this.props.listUsers) {
            const genders = this.props.genderRedux;
            const positions = this.props.positionRedux;
            const roles = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                gender: genders && genders.length > 0 ? genders[0].key : '', // Get value default
                positionId: positions && positions.length > 0 ? positions[0].key : '',
                roleId: roles && roles.length > 0 ? roles[0].key : '',
                phoneNumber: '',
                image: '',
                previewImgAvatar: '',
                action: CRUD_action.CREATE,
            })
        }
    }

    handleOnChangeAvatar = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileBase64 = await CommonUtils.getBase64(file);
            this.setState({
                previewImgAvatar: URL.createObjectURL(file),
                image: fileBase64,
            })
        }

    }

    openPreviewImage = () => {
        if (!this.state.isOpenImagePreview) return;
        this.setState({
            isOpenImagePreview: true,
        })
    }

    isValidUser = () => {
        let isValid = true;
        const fieldsValidate = ['email', 'password', 'firstName', 'lastName', 'address',
            'roleId', 'gender', 'positionId', 'phoneNumber'];
        let message = 'The input requires: ';
        for (let i = 0; i < fieldsValidate.length; ++i) {
            if (!this.state[fieldsValidate[i]]) {
                isValid = false;
                message += fieldsValidate[i] + ',';
            }
        }

        if (!isValid) {
            alert(message);
        }

        return isValid;
    }

    onChangeInputUser = (event, type) => {
        const copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSaveUser = async () => {
        const { action } = this.state;
        const isValid = this.isValidUser();
        if (!isValid) return;

        const { email, password, firstName, lastName, address,
            gender, roleId, positionId, phoneNumber, image} = this.state;

        if (action === CRUD_action.CREATE) {
            try {
                await this.props.createNewUserRedux({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    gender: gender,
                    roleId: roleId,
                    positionId: positionId,
                    phoneNumber: phoneNumber,
                    image: image,
                })
            } catch (error) {
                console.log(error);
            }
        }

        if (action === CRUD_action.EDIT) {
            try {
                await this.props.editUserRedux({
                    id : this.state.id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    gender: gender,
                    roleId: roleId,
                    positionId: positionId,
                    phoneNumber: phoneNumber,
                    image: image,
                })
            } catch (error) {
                console.log(error);
            }
        }

    }

    handleEditUserFromParent = (user) => {
        let imageBase64;
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        console.log(user)
        if (user) {
            this.setState({
                // email: user.email,
                // password: 'xxxx',
                // firstName: user.firstName,
                // lastName: user.lastName,
                // address: user.address,
                // gender: user.gender,
                // roleId: user.roleId,
                // positionId: user.positionId,
                // phoneNumber: user.phoneNumber,
                // image: user.image,
                ...user,
                previewImgAvatar: imageBase64,
                password: "hardcode",
                action: CRUD_action.EDIT,
            })
        }
    }


    render() {
        const { language } = this.props;
        const { genderData, positionData, roleData } = this.state;
        let { email, password, firstName, lastName, address, phoneNumber,
            roleId, positionId, gender, action } = this.state;

        return (
            <React.Fragment>
                <div className="manage-admin-container">
                    <div className="manage-admin-header">
                        <h1 className='text-center my-3'>Manage with redux</h1>
                    </div>
                    <div className="manage-admin-body">
                        <div className="container">
                            <div className="row body-title"> Add new user </div>
                            <div className="row my-3">
                                <div className="form-group col-3 ">
                                    <label htmlFor="">Email</label>
                                    <input type="text" className='form-control' value={email}
                                        onChange={(event) => this.onChangeInputUser(event, 'email')}
                                        disabled={action === CRUD_action.EDIT} />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">Password</label>
                                    <input type="password" className='form-control' value={password}
                                        onChange={(event) => this.onChangeInputUser(event, 'password')}
                                        disabled={action === CRUD_action.EDIT} />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">First name</label>
                                    <input type="text" className='form-control' value={firstName}
                                        onChange={(event) => this.onChangeInputUser(event, 'firstName')} />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">Last name</label>
                                    <input type="text" className='form-control' value={lastName}
                                        onChange={(event) => this.onChangeInputUser(event, 'lastName')} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-9">
                                    <label htmlFor="">Address</label>
                                    <input type="text" className='form-control' value={address}
                                        onChange={(event) => this.onChangeInputUser(event, 'address')} />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">Phone</label>
                                    <input type="text" className='form-control' value={phoneNumber}
                                        onChange={(event) => this.onChangeInputUser(event, 'phoneNumber')} />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="form-group col-3">
                                    <label htmlFor="">Gender</label>
                                    <select className="form-select" value={gender}
                                        onChange={(event) => this.onChangeInputUser(event, 'gender')}>
                                        {genderData && genderData.length > 0 &&
                                            genderData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">Position</label>
                                    <select className="form-select" value={positionId}
                                        onChange={(event) => this.onChangeInputUser(event, 'positionId')}>
                                        {positionData && positionData.length > 0 &&
                                            positionData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">Role</label>
                                    <select className="form-select" value={roleId}
                                        onChange={(event) => this.onChangeInputUser(event, 'roleId')}>
                                        {roleData && roleData.length > 0 &&
                                            roleData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-3 img-container">
                                    <label htmlFor="upload-avatar">Avatar</label>
                                    <input type="file" id='upload-avatar' hidden
                                        onChange={(event) => this.handleOnChangeAvatar(event)} />
                                    <label htmlFor='upload-avatar' className='upload-avatar form-control'>
                                        Upload <i className="fas fa-upload"></i>
                                    </label>
                                    <div className="preview-image mt-1"
                                        style={{ backgroundImage: `url(${this.state.previewImgAvatar})` }}
                                        onClick={() => this.openPreviewImage()}>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="btn btn-primary col-1 mx-3" onClick={() => this.handleSaveUser()}>
                                    {action === CRUD_action.EDIT ? "Update" : "Create"}
                                </div>
                            </div>
                            <div className="row my-5">
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpenImagePreview &&
                    <Lightbox
                        mainSrc={this.state.previewImgAvatar}
                        onCloseRequest={() => this.setState({ isOpenImagePreview: false })}
                    />
                }
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUserRedux: (data) => dispatch(actions.createNewUserRedux(data)),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserRedux()),
        editUserRedux: (data) => dispatch(actions.editUserRedux(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
