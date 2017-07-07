import React from 'react'
import Modal from 'react-modal';
import { customModalStyles } from '../helpers/constants'


export default function ModalConfirm(props) {

      return (
            <Modal isOpen={props.showModalState} style={customModalStyles} contentLabel="Anota ai">

                  <h5 className="center-align">Anota ai</h5>

                  <div className="section"></div>

                  <div className="row center-align">{props.text}</div>

                  <div className="section"></div>

                  <div className="row center-align">
                        <button onClick={props.confirm} className="btn btn-small waves-effect SUCCESS" style={{ marginTop: '10px' }}>Ok</button>
                        <button onClick={props.hideModal} className="btn btn-small waves-effect WARNING" style={{ marginLeft: '5px', marginTop: '10px' }}>Cancelar</button>
                  </div>
            </Modal>
      )
}