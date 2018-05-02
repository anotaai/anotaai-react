import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detail from './Detail';
import { handleInputChange, addBook,  clearForm, removeBook, showModal, hideModal, updateState } from '../../../../actions/appointmentBookActionCreator';
import AppointmentBookService from '../../../../services/appointmentbook/AppointmentBookService';
import { URL } from '../../../../helpers/constants';
import Toast from '../../../../helpers/Toast';
import { browserHistory } from 'react-router';
import Base64Service from '../../../../services/app/Base64Service';
import { pushEncoded } from '../../../App'


class EditDetail extends Component {


    constructor() {
        super();
        this.sendButton = null;
    }

    componentDidMount() {
        this.props.findById(Base64Service.decode(this.props.params.id));
    }

    componentWillUnmount() {
      this.props.clearForm();
    }

     update(e) {

        e.preventDefault();
    
        AppointmentBookService.update(this.props.detailState, this.sendButton).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            console.log('ERRO [components\\private\\appointmentbook\\detail\\EditDetail.js 36]');
        });
    }

    remove() {
        
        AppointmentBookService.remove(this.props.detailState.id).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.APPOINTMENT_BOOK);
            }
        }).catch(error => {
            console.log('ERRO [components\\private\\appointmentbook\\detail\\EditDetail.js 48]');
        });

    }

    render() {
        return (
            <Detail
                {... this.props.detailState}
                title="Edição da Caderneta"
                merge={this.update.bind(this)}
                cadernetas={this.props.detailState.cadernetas}
                handleInputChange={this.props.handleInputChange}
                addBook={this.props.addBook}
                removeBook={this.props.removeBook}
                remove={this.remove.bind(this)}
                showModal={this.props.showModal} 
                hideModal={this.props.hideModal} 
                showModalState={this.props.detailState.showModalState} 
                checkSameConfiguration={this.props.checkSameConfiguration}
                submitRef={el => this.sendButton = el} />
        )
    }
}

const mapStateToProps = state => {
    return { detailState: state.detailAppointmentBook }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },
        addBook: () => {
            dispatch(addBook());
        },
        removeBook: (i,e) => {
            dispatch(removeBook(i));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        showModal: () => {
          dispatch(showModal());

        },
        findById: (id) => {
            dispatch(AppointmentBookService.findById(id, updateState));
        },
        hideModal: () => {
          dispatch(hideModal());
        },
        checkSameConfiguration: (diaBase,qtdDiasDuracaoFolha,id) => {
            AppointmentBookService.checkSameConfiguration(diaBase,qtdDiasDuracaoFolha,id).then(response => {
                if (response.entity !== undefined) {
                    Toast.show(response.messages);
                    pushEncoded(URL.APPOINTMENT_BOOK,response.entity.id);
                    dispatch(AppointmentBookService.findById(response.entity.id, updateState));
                    
                } 
            }).catch(error => {
                console.log('ERRO [components\\private\\appointmentbook\\detail\\EditDetail.js 110]');
            });
        }
    }
}

const EditAppointmentBookDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);
export default EditAppointmentBookDetailContainer;