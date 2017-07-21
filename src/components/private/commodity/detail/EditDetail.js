import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInputChange, updateTableItens, updateProductAutoComplete, removeProduct, updateProductList, clearForm, updateState, showModal, hideModal } from '../../../../actions/commodityActionCreator'
import Detail from './Detail'
import ProductService from '../../../../services/product/ProductService'
import CommodityService from '../../../../services/commodity/CommodityService'
import Base64Service from '../../../../services/app/Base64Service'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'
import { URL } from '../../../../helpers/constants'

class EditDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    componentDidMount() {
        this.props.findById(Base64Service.decode(this.props.params.id));
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    update(e) {
        e.preventDefault();

        CommodityService.update(this.props.detailState,this.sendButton).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            Toast.defaultError();
        });
    }

    remove() {

        CommodityService.remove(this.props.detailState.id).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.COMMODITY);
            }
        }).catch(error => {
            Toast.defaultError();
        });
    }

    render() {
        return (
            <Detail
                title="Edição de Entrada de Mercadoria"
                {... this.props.detailState}
                merge={this.update.bind(this)}
                handleInputChange={this.props.handleInputChange}
                handleNumericChange={this.props.handleNumericChange}
                itens={this.props.detailState.itens}
                produtos={this.props.detailState.produtos}
                getProduct={this.props.getProduct}
                setProduct={this.props.setProduct}
                removeProduct={this.props.removeProduct}
                updateTableItens={this.props.updateTableItens}
                remove={this.remove.bind(this)}
                showModal={this.props.showModal} 
                hideModal={this.props.hideModal} 
                showModalState={this.props.detailState.showModalState} 
                submitRef={el => this.sendButton = el}
            />

        )
    }
}

const mapStateToProps = state => {
    return { detailState: state.detailCommodity }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },
        getProduct: (name, value) => {
            new Promise((resolve) => {
                resolve(dispatch(handleInputChange(name, value)));
            }).then(() => {
                dispatch(ProductService.getProducts(value, updateProductList));
            });
        },
        updateTableItens: () => {
            dispatch(updateTableItens());
        },
        setProduct: (product) => {
            dispatch(updateProductAutoComplete(product));
        },
        removeProduct: (id) => {
            dispatch(removeProduct(id));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        findById: (id) => {
            dispatch(CommodityService.findById(id, updateState));
        },
        handleNumericChange: (name, value) => {
            if (value !== 0) {
                dispatch(handleInputChange(name, value));
            }
        },
        showModal: () => {
          dispatch(showModal());
        },
        hideModal: () => {
          dispatch(hideModal());
        }

    }
}

const EditCommodityDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);
export default EditCommodityDetailContainer;