import React, { Component } from 'react'
import { connect } from 'react-redux'
import { URL } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import Base64Service from '../../../../services/app/Base64Service'
import { browserHistory } from 'react-router'
import ClienteConsumidorService from '../../../../services/consumer/ClienteConsumidorService'
import { clearForm, handleInputChange } from '../../../../actions/consumerActionCreator'

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
        
        const newInstance = ClienteConsumidorService.getPhone(this.props.detailState);

        ClienteConsumidorService.save(newInstance).then(response => {
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
               {... this.props.detailState}
               merge={this.save.bind(this)}
               submitRef={el => this.sendButton = el} 
               handleInputChange={this.props.handleInputChange}
             />
        );

    }
}


const mapStateToProps = state => {
    return { detailState: state.detailConsumer }
}

const matDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
    }
}

const NewConsumerDetailContainer = connect(mapStateToProps, matDispatchToProps)(NewDetail);

export default NewConsumerDetailContainer;

