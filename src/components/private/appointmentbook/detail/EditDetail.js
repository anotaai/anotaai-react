import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'

class EditDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
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
    return { detailState : state.detailAppointmentBook }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const EditAppointmentBookDetailContainer = connect(mapStateToProps,mapDispatchToProps)(EditDetail);
export default EditAppointmentBookDetailContainer;