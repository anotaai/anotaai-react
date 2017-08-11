import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'

class NewDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    
    componentWillUnmount() {

    }

    save(e) {
       e.preventDefault();
    }

    render() {

       return (
            <Detail 
             {... this.props.detailState}
             title="Cadastro da Caderneta" 
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

    }
}

const NewAppointmentBookDetailContainer = connect(mapStateToProps,mapDispatchToProps)(NewDetail);
export default NewAppointmentBookDetailContainer;