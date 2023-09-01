import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { LANGUAGES } from '../../../utils/constant';
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
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderData: this.props.genderRedux
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionData: this.props.positionRedux
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleData: this.props.roleRedux
            })
        }
    }



    handleOnChangeAvatar = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.setState({
                previewImgAvatar: URL.createObjectURL(file)
            })
        }

    }

    openPreviewImage = () => {
        if (!this.state.isOpenImagePreview) return;
        this.setState({
            isOpenImagePreview: true,
        })
    }


    render() {
        const { language } = this.props;
        const { genderData, positionData, roleData } = this.state;
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
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">Password</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">First name</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">Last name</label>
                                    <input type="text" className='form-control' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-9">
                                    <label htmlFor="">Address</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="form-group col-3">
                                    <label htmlFor="">Phone</label>
                                    <input type="text" className='form-control' />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="form-group col-3">
                                    <label htmlFor="">Gender</label>
                                    <select className="form-select">
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
                                    <select className="form-select">
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
                                    <select className="form-select">
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
                                <div className="btn btn-primary">Save</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
