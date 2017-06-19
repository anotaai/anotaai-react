import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USE_CASE, URL } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import Base64Service from '../../../../services/app/Base64Service'
import { browserHistory } from 'react-router'
import ClienteConsumidorService from '../../../../services/consumer/ClienteConsumidorService'
import { clearForm, handleInputChange } from '../../../../actions/userActionCreator'

class NewDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    save(e) {

        e.preventDefault();
    
        this.sendButton.setAttribute("disabled", "disabled");
        
        const clienteConsumidor = ClienteConsumidorService.buildConsumer(null,this.props.detailState.userLogin.usuario);

        ClienteConsumidorService.save(clienteConsumidor).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                const id = Base64Service.encode(response.entity.id.toString());
                browserHistory.push(`${URL.CONSUMER}/${id}`);
            } 
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
              if(this.sendButton != null)
               this.sendButton.removeAttribute("disabled");
        });

    }


    render() {
        return (
            <Detail
               title="Cadastro de Consumidor"
               {...this.props.detailState}
               merge={this.save.bind(this)}
               submitRef={el => this.sendButton = el} 
               handleInputChange={this.props.handleInputChange}
             />
        );

    }
}


const mapStateToProps = state => {
    return { detailState: state.consumer }
}

const matDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(USE_CASE.CONSUMER, e.target.name, e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm(USE_CASE.CONSUMER));
        },
    }
}

const NewConsumerDetailContainer = connect(mapStateToProps, matDispatchToProps)(NewDetail);

export default NewConsumerDetailContainer;

