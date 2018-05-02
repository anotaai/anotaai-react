import React, { Component } from 'react'
import { connect } from 'react-redux'
import { URL } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import ClienteConsumidorService from '../../../../services/consumer/ClienteConsumidorService'
import { clearForm, handleInputChange } from '../../../../actions/consumerActionCreator'
import { pushEncoded } from '../../../App'

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
        const newInstance = ClienteConsumidorService.getPhone(this.props.detailState.clienteConsumidor);
        ClienteConsumidorService.save(newInstance, this.sendButton).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                pushEncoded(URL.CONSUMER,response.entity.id);
            } 
        }).catch(error => {
            console.log('ERRO [components\\private\\consumer\\detail\\NewDetail.js 37]');
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

