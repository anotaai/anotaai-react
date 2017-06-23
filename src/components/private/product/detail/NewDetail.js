import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange } from '../../../../actions/groupProductActionCreator'


class NewDetail extends Component {


    save(e) {
        e.preventDefault();
    }

    render() {
        return (
            <Detail
                title="Cadastro de Produtos"
                merge={this.save.bind(this)}
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

const NewProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(NewDetail);
export default NewProductDetailContainer;