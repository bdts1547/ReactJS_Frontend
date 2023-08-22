import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import  *  as userService from '../../services/userService';

import './UserManage.scss';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter';


class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            currentEditUser: {}
        }
    }


    async componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = async () => {
        const response = await userService.getAllUsers('all');
        if (response && response.errCode === 0) {
            this.setState({
                users: response.users
            })
        }
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        const res = await userService.createNewUser(data);
        if (res && res.errCode === 0) {
            this.toggleModalUser();
            await this.getAllUsers();
            emitter.emit('EVENT_RESET_MODAL', {id: 'your id'});
        } else {
            alert(res.message);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            const res = await userService.deleteUser(user.id);
            if (res && res.errCode === 0) {
                this.getAllUsers();
            } else {
                alert(res.errMessage);
            }
            
        } catch (error) {
            alert(error);
        }
    }

    doOpenModalEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            currentEditUser: user
        })
    }

    doEditUser = async (data) => {
        try {
            const res = await userService.updateUser(data);

            if (res && res.errCode === 0) {
                this.toggleModalEditUser();
                this.getAllUsers();
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error);
        }
       
    }


    render() {
        const users = this.state.users;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleModalUser={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                />
                {   this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleModalEditUser={this.toggleModalEditUser}
                        currentEditUser={this.state.currentEditUser}
                        doEditUser={this.doEditUser}
                    />
                }
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={() => this.toggleModalUser()}>
                        <i className='fas fa-plus'></i>
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {users && users.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.Address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.doOpenModalEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                        </td>

                                    </tr>
                                )
                            })
                            }
                        </tbody>



                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
