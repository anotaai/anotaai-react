import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { URL } from '../../../../helpers/constants'
import { browserHistory } from 'react-router'
import SectorService from '../../../../services/sector/SectorService'
import Base64Service from '../../../../services/app/Base64Service'
import Toast from '../../../../helpers/Toast'
import Detail, { stateJsonDetail } from './Detail'
import { getObjectNewState } from '../../../../helpers/jsonHelper'

class NewDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
        this.state = stateJsonDetail();
    }

    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }


    save(e) {
        e.preventDefault();
        this.props.showLoading();
        this.sendButton.setAttribute("disabled", "disabled");

        SectorService.save(this.state).then(response => {
            if (response.isValid) {
                Toast.show(response.messages);
                const id = Base64Service.encode(response.entity.id.toString());
                browserHistory.push(`${URL.SECTOR}/${id}`);
            } else {
                Toast.show(response.messages);
            }
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
            if (this.sendButton) {
                this.sendButton.removeAttribute("disabled");
            }
            this.props.hideLoading();
        });

    }

    render() {
        return (
            <Detail {...this.state} title="Cadastro de Setores" merge={this.save.bind(this)} handleInputChange={this.handleInputChange.bind(this)}  submitRef={el => this.sendButton = el} />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoading: () => {
            dispatch(showLoading());
        },
        hideLoading: () => {
            dispatch(hideLoading());
        }
    }
}



const NewSectorContainer = connect(null,mapDispatchToProps)(NewDetail);

export default NewSectorContainer;