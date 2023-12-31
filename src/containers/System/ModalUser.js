
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_RESET_MODAL', data => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleModalUser();
    }

    handleOnChangeInput = (event, type) => {
        const copyState = { ...this.state };
        copyState[type] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    isValidNewUser = (data) => {
        let isValid = true;
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


    handleAddNewUser = () => {
        const isValid = this.isValidNewUser(this.state);

        if (isValid) {
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input type="email" onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                value={this.state.email} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input type="password" onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                value={this.state.password} />
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
                        onClick={() => this.handleAddNewUser()}>Add</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);






