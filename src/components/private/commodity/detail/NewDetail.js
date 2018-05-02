import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { handleInputChange, updateTableItens, updateProductAutoComplete, removeProduct, updateProductList, clearForm } from '../../../../actions/commodityActionCreator'
import ProductService from '../../../../services/product/ProductService'
import CommodityService from '../../../../services/commodity/CommodityService'
import Toast from '../../../../helpers/Toast'
import { URL } from '../../../../helpers/constants'
import { pushEncoded } from '../../../App'

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

        CommodityService.save(this.props.detailState, this.sendButton).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                pushEncoded(URL.COMMODITY,response.entity.id);
            }
        }).catch(error => {
            console.log('ERRO [components\\private\\commodity\\detail\\NewDetail.js 33]');
        });
    }

    render() {
        return (
            <Detail
                title="Cadastro de Entrada de Mecadoria"
                {... this.props.detailState}
                itens={this.props.detailState.itens}
                produtos={this.props.detailState.produtos}
                getProduct={this.props.getProduct}
                setProduct={this.props.setProduct}
                removeProduct={this.props.removeProduct}
                updateTableItens={this.props.updateTableItens}
                merge={this.save.bind(this)}
                submitRef={el => this.sendButton = el}
                handleInputChange={this.props.handleInputChange}
                handleNumericChange={this.props.handleNumericChange}
            />
        );
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
                dispatch(ProductService.getProducts(value,updateProductList));
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
        handleNumericChange: (name,value) => {
            if(value !== 0) {
               dispatch(handleInputChange(name, value));
            }
        }

    }
}

const NewCommodityDetailContainer = connect(mapStateToProps, mapDispatchToProps)(NewDetail)
export default NewCommodityDetailContainer;