import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import Toast from '../../../../helpers/Toast'
import Base64Service from '../../../../services/app/Base64Service'
import { browserHistory } from 'react-router'
import SectorService  from '../../../../services/sector/SectorService'
import GroupProductService  from '../../../../services/groupproduct/GroupProductService'
import { clearForm , handleInputChange } from '../../../../actions/groupProductActionCreator'
import { URL } from '../../../../helpers/constants'

class NewDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;    
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    componentDidMount() {
       this.props.getSectors();
    }

    save(e) {
       
        e.preventDefault();

        GroupProductService.save(this.props.detailState,this.sendButton).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                const id = Base64Service.encode(response.entity.id.toString());
                browserHistory.push(`${URL.GROUP_PRODUCT}/${id}`);
            } 
        }).catch(error => {
            Toast.defaultError();
        });
    }

    render() {
        return (
            <Detail title="Cadastro de Grupo de Produtos"
                {... this.props.detailState}
                setores={this.props.detailState.setores}
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
        },
        getSectors: () => {
            dispatch(SectorService.getSectors());
        }
    }
}

const NewGroupProductDetailContainer = connect(mapStateToProps,mapDispatchToProps)(NewDetail);

export default NewGroupProductDetailContainer;