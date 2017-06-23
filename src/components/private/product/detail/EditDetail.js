import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange } from '../../../../actions/groupProductActionCreator'


class EditDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    update(e) {
        e.preventDefault();
    }

    componentWillUnmount() {
       this.props.clearForm();
    }

    render() {
        return (
            <Detail
                {... this.props.detailState}
                title="Edição de Produtos"
                merge={this.update.bind(this)}
                submitRef={el => this.sendButton = el}
                handleInputChange={this.props.handleInputChange} />
        )
    }

}

const mapStateToProps = state => {
    return { detailState: state.detailProduct };
}

const mapDispatchToProps = dispatch => {
    return {

        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },

        clearForm: () => {
            dispatch(clearForm());
        }
    }
}

const EditProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);
export default EditProductDetailContainer;