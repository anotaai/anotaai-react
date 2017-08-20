import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detail from './Detail';
import { handleInputChange, addBook,  clearForm, removeBook } from '../../../../actions/appointmentBookActionCreator';
import AppointmentBookService from '../../../../services/appointmentbook/AppointmentBookService';
import { URL } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
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

        AppointmentBookService.save(this.props.detailState, this.sendButton).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                pushEncoded(URL.APPOINTMENT_BOOK,response.entity.id);
            } 
        }).catch(error => {
            Toast.defaultError();
        });
    }

    render() {

       return (
            <Detail 
             {... this.props.detailState}
             title="Cadastro da Caderneta" 
             cadernetas={this.props.detailState.cadernetas}
             handleInputChange={this.props.handleInputChange}
             addBook={this.props.addBook}
             removeBook={this.props.removeBook}
             merge={this.save.bind(this)}
             submitRef={el => this.sendButton = el} />
       )
    }
} 

const mapStateToProps = state => {
    return { detailState : state.detailAppointmentBook }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name,e.target.value));
        },
        addBook: () => {
            dispatch(addBook());
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        removeBook: (i,e) => {
            dispatch(removeBook(i));
        }
    }
}

const NewAppointmentBookDetailContainer = connect(mapStateToProps,mapDispatchToProps)(NewDetail);
export default NewAppointmentBookDetailContainer;