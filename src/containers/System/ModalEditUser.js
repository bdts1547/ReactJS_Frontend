
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        }
    }

    componentDidMount() {
        const user = this.props.currentEditUser;
        this.setState({
            id: user.id,
            email: user.email,
            password: 'NONE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
        })
    }

    toggle = () => {
        this.props.toggleModalEditUser();
    }

    handleOnChangeInput = (event, type) => {
        const copyState = { ...this.state };
        copyState[type] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    isValidUser = (data) => {
        let isValid = true;
        const field = ['email', 'firstName', 'lastName', 'address'];
        const _state = { ...this.state };
        for (const key in _state) {
            if (!data[key]) {
                alert('Missing params ' + key);
                isValid = false;
                break;
            }
        }

        return isValid;
    }


    handleEditUser = () => {
        const isValid = this.isValidUser(this.state);

        if (isValid) {
            this.props.doEditUser(this.state);
        }



    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">First name</label>
                            <input type="text" onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                value={this.state.firstName} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last name</label>
                            <input type="text" onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                value={this.state.lastName} />
                        </div>
                        <div className="input-container max-w">
                            <label htmlFor="">Address</label>
                            <input type="text" onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                value={this.state.address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary mx-2 px-2"
                        onClick={() => this.handleEditUser()}>Save</Button>
                    <Button color="secondary px-2" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);






