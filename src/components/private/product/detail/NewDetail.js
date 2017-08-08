import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange, updateUnit, updateDayOfWeek, updateAvailableDays, newDefaultValues, 
    updateProductAutoComplete, updateTableItens,removeProduct, updateProductList, updateGroupProductList,
    toggleGroupProductAccordion, toggleCommodityAccordion, updateGroupProductAutoComplete, 
    updateGroupProductTableItens, removeGroupProduct, changeGroupProductRadio, updateStorageProduct } from '../../../../actions/productActionCreator'
import EnumService from '../../../../services/util/EnumService'
import ProductService from '../../../../services/product/ProductService'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import { URL } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
import { pushEncoded } from '../../../App'

class NewDetail extends Component {


    componentDidMount() {
        this.props.loadEnum('unidadesmedida',updateUnit);
        this.props.loadEnum('diasemana',updateDayOfWeek);
        this.props.loadEnum('tiposArmazenamento',updateStorageProduct);
        this.props.newDefaultValues();
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    save(e) {

      e.preventDefault();

       const newInstance = ProductService.setJson(this.props.detailState);

        ProductService.save(newInstance,this.sendButton).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                pushEncoded(URL.PRODUCT,response.entity.id);
            } 
        }).catch(error => {
              Toast.defaultError();
         });
    }

    render() {

        
        return (
            <Detail
                {... this.props.detailState}
                title="Cadastro de Produtos"
                merge={this.save.bind(this)}
                unidadeList={this.props.detailState.unidadeList}
                armazenamentoList={this.props.detailState.armazenamentoList}
                diasDisponibilidade={this.props.detailState.diasDisponibilidade}
                diasSemana={this.props.detailState.diasSemana}
                produtos={this.props.detailState.produtos}
                grupos={this.props.detailState.grupos}
                gruposTableList={this.props.detailState.gruposTableList}
                itensReceita={this.props.detailState.itensReceita}
                getProduct={this.props.getProduct}
                setProduct={this.props.setProduct}
                getGroupProduct={this.props.getGroupProduct}
                setGroupProduct={this.props.setGroupProduct}
                removeProduct={this.props.removeProduct}
                removeGroupProduct={this.props.removeGroupProduct}
                updateTableItens={this.props.updateTableItens}
                changeGroupProductRadio={this.props.changeGroupProductRadio}
                updateGroupProductTableItens={this.props.updateGroupProductTableItens}
                submitRef={el => this.sendButton = el}
                handleInputChange={this.props.handleInputChange}
                handleCheckbox={this.props.handleCheckbox}
                handleNumericChange={this.props.handleNumericChange}
                toggleGroupProductAccordion={this.props.toggleGroupProductAccordion}
                toggleCommodityAccordion={this.props.toggleCommodityAccordion}
                updateAvailableDays={this.props.updateAvailableDays} />
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
        handleNumericChange: (name,value) => {
            if(value !== 0) {
               dispatch(handleInputChange(name, value));
            }
        },
        handleCheckbox: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.checked));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        loadEnum: (name,functionUpdate) => {
            dispatch(EnumService.load(name, functionUpdate));
        },
        updateAvailableDays: (chips) => {
            dispatch(updateAvailableDays(chips));
        },
        newDefaultValues: () => {
            dispatch(newDefaultValues());
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
        getGroupProduct: (name, value) => {
            new Promise((resolve) => {
                resolve(dispatch(handleInputChange(name, value)));
            }).then(() => {
                dispatch(GroupProductService.getGroups(value,updateGroupProductList));
            });
        },
        changeGroupProductRadio: (id) => {
           dispatch(changeGroupProductRadio(id));
        },
        setGroupProduct: (groupProduct) => {
            dispatch(updateGroupProductAutoComplete(groupProduct));
        },
        updateGroupProductTableItens: () => {
           dispatch(updateGroupProductTableItens());
        },
        toggleGroupProductAccordion: () => {
            dispatch(toggleGroupProductAccordion());
        },
        removeGroupProduct: (id) => {
           dispatch(removeGroupProduct(id));
        },
        toggleCommodityAccordion: () => {
            dispatch(toggleCommodityAccordion());
        }
    }
}

const NewProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(NewDetail);
export default NewProductDetailContainer;