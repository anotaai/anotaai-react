import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import Detail, { stateJsonDetail } from './Detail'
import Toast from '../../../../helpers/Toast'
import Base64Service from '../../../../services/app/Base64Service'
import { browserHistory } from 'react-router'
import { getObjectNewState } from '../../../../helpers/jsonHelper'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'

class NewDetail extends Component {

    constructor() {
        super();
        this.state = stateJsonDetail();
    }


    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }


    save(e) {
        e.preventDefault();
       
        this.sendButton.setAttribute("disabled", "disabled");

        GroupProductService.save(this.state).then(response => {
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
        });

    }

    render() {
        return (
            <Detail title="Cadastro de Grupo de Produtos"
                merge={this.save.bind(this)}
                submitRef={el => this.sendButton = el} 
                handleInputChange={this.handleInputChange.bind(this)} />
        )
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

const NewGroupProductDetailContainer = connect(null, mapDispatchToProps)(NewDetail);

export default NewGroupProductDetailContainer;