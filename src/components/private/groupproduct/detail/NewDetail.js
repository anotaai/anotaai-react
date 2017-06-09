import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import Toast from '../../../../helpers/Toast'
import Base64Service from '../../../../services/app/Base64Service'
import { browserHistory } from 'react-router'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import { clearForm , handleInputChange } from '../../../../actions/groupProductActionCreator'

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
       
        this.sendButton.setAttribute("disabled", "disabled");

        GroupProductService.save(this.props.detailState).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                const id = Base64Service.encode(response.entity.id.toString());
                browserHistory.push(`${URL.SECTOR}/${id}`);
            } 
        }).catch(error => {
            Toast.defaultError();
            this.sendButton.removeAttribute("disabled");
        });

    }

    render() {
        return (
            <Detail title="Cadastro de Grupo de Produtos"
                merge={this.save.bind(this)}
                submitRef={el => this.sendButton = el} 
                handleInputChange={this.props.handleInputChange}/>
        )
    }

}

const mapStateToProps = state => {
     return { detailState: state.detailGroupProduct }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name,e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm());
        }
    }
}

const NewGroupProductDetailContainer = connect(mapStateToProps,mapDispatchToProps)(NewDetail);

export default NewGroupProductDetailContainer;