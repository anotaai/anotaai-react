import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, exit } from '../actions/renewLoginActionCreator'
import Modal from 'react-modal';
import { customModalStyles } from '../helpers/constants'

class RenewLogin extends Component {

    render() {
        return (
            <div>
                <Modal isOpen={this.props.showModalState} style={customModalStyles} contentLabel="Anota ai">
                        <h5 className="center-align">Refazer Login</h5>
                        <div className="section"></div>
                        <div className="row center-align">Blah</div>
                        <div className="section"></div>
                        <div className="row center-align">
                              <button onClick={login} className="btn btn-small waves-effect SUCCESS" style={{ marginTop: '10px' }}>Login</button>
                              <button onClick={exit} className="btn btn-small waves-effect WARNING" style={{ marginLeft: '5px', marginTop: '10px' }}>Sair</button>
                        </div>
                  </Modal>
            </div>
        )
    }
}

export function hideModalRenewLogin() {
    console.log("blah...");
}

const RenewLoginContainer = connect()(RenewLogin);

export default RenewLoginContainer;