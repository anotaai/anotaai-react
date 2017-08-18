import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { handleInputChange, addBook, clearForm } from '../../../../actions/appointmentBookActionCreator'

class EditDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
      this.props.clearForm();
    }

    update(e) {
        e.preventDefault();
    }

    remove() {

    }

    render() {
        return (
            <Detail
                {... this.props.detailState}
                title="Edição da Caderneta"
                merge={this.update.bind(this)}
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
        clearForm: () => {
            dispatch(clearForm());
        }
    }
}

const EditAppointmentBookDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);
export default EditAppointmentBookDetailContainer;