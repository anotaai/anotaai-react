import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'

class EditDetail extends Component {

    render() {
        return (
            <Detail />
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const EditAppointmentBookDetailContainer = connect(mapStateToProps,mapDispatchToProps)(EditDetail);
export default EditAppointmentBookDetailContainer;