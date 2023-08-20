import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { getAllUsers } from '../../services/userService';

import './UserManage.scss';
import ModalUser from './ModalUser';



class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModalUser: false,
        }
    }


    async componentDidMount() {
        const response = await getAllUsers('all');
        if (response && response.errCode === 0) {
            this.setState({
                users: response.users
            })
        }
    }

    // openAddNewUser = () => {
    //     this.setState({
    //         isOpenModalUser: !this.state.isOpenModalUser
    //     })
    // }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }


    render() {
        const users = this.state.users;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleModalUser={this.toggleModalUser}
                />
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
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {users && users.map((item) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.Address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                    </td>
                                    
                                </tr>
                            )
                        })

                        }



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
