import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { handleInputChange, addBook,  clearForm } from '../../../../actions/appointmentBookActionCreator'

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
    }

    render() {

       return (
            <Detail 
             {... this.props.detailState}
             title="Cadastro da Caderneta" 
             cadernetas={this.props.detailState.cadernetas}
             handleInputChange={this.props.handleInputChange}
             addBook={this.props.addBook}
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
        } ,
        addBook: () => {
            dispatch(addBook());
        },
        clearForm: () => {
            dispatch(clearForm());
        }
    }
}

const NewAppointmentBookDetailContainer = connect(mapStateToProps,mapDispatchToProps)(NewDetail);
export default NewAppointmentBookDetailContainer;