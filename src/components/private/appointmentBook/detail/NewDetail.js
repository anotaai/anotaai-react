import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'

class NewDetail extends Component {

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

const NewAppointmentBookDetailContainer = connect(mapStateToProps,mapDispatchToProps)(NewDetail);
export default NewAppointmentBookDetailContainer;