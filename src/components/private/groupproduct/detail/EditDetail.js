import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import Base64Service from '../../../../services/app/Base64Service'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import SectorService from '../../../../services/sector/SectorService'
import { clearForm, handleInputChange, updateState, showModal, hideModal } from '../../../../actions/groupProductActionCreator'
import { updateProductByGroup } from '../../../../actions/productActionCreator'
import { browserHistory } from 'react-router'
import { URL } from '../../../../helpers/constants'
import { CustomButtons, CustomResponsiveButtons } from './customButtons'


class EditDetail extends Component {

    constructor(props) {
        super(props);
        this.sendButton = null;
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    componentDidMount() {
        this.props.findById(Base64Service.decode(this.props.params.id));
        this.props.getSectors();
    }

    update(e) {

        e.preventDefault();

        GroupProductService.update(this.props.detailState,this.sendButton).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            Toast.defaultError();
        });
    }


    remove() {

        GroupProductService.remove(this.props.detailState.id).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.GROUP_PRODUCT);
            }
        }).catch(error => {
            Toast.defaultError();
        });
    }

    sendGroupProduct() {
        browserHistory.push(URL.NEW_PRODUCT);
        this.props.sendGroupProduct(this.props.detailState.id,this.props.detailState.nome);
    }


    render() {
        return (
            <Detail
                title="Edição de Grupos de Produtos"
                {... this.props.detailState}
                customResponsiveButtons={<CustomResponsiveButtons sendGroupProduct={this.sendGroupProduct.bind(this)}/>}
                customButtons={<CustomButtons sendGroupProduct={this.sendGroupProduct.bind(this)}  />}
                setores={this.props.detailState.setores}
                merge={this.update.bind(this)}
                handleInputChange={this.props.handleInputChange}
                submitRef={el => this.sendButton = el}
                showModal={this.props.showModal}
                hideModal={this.props.hideModal}
                showModalState={this.props.detailState.showModalState}
                remove={this.remove.bind(this)} />
        )
    }

}

const mapStateToProps = state => {
    return { detailState: state.detailGroupProduct }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        findById: (id) => {
            dispatch(GroupProductService.findById(id, updateState));
        },
        showModal: () => {
            dispatch(showModal());
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        getSectors: () => {
            dispatch(SectorService.getSectors());
        },
        sendGroupProduct: (id,nome) => {
            dispatch(updateProductByGroup(id,nome))
        }
    }
}

const EditGroupProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);

export default EditGroupProductDetailContainer;