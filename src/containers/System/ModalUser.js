
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleModalUser();
    }


    render() {
        console.log(this.props)
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
                            <input type="text" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input type="password" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">First name</label>
                            <input type="password" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last name</label>
                            <input type="password" />
                        </div>
                        <div className="input-container max-w">
                            <label htmlFor="">Address</label>
                            <input type="password" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary mx-2 px-2" onClick={() => this.toggle()}>Save</Button>{' '}
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






