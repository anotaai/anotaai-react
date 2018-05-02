import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange, updateUnit, updateDayOfWeek, updateAvailableDays, updateProduct, updateGroupProductAutoComplete,
    updateProductAutoComplete, updateTableItens, removeProduct, showModal, hideModal, updateProductList, changeGroupProductRadio,
    toggleGroupProductAccordion, toggleCommodityAccordion, updateGroupProductList, removeGroupProduct, updateGroupProductTableItens,
    updateStorageProduct, showModalCommodity, hideModalCommodity
} from '../../../../actions/productActionCreator'
import { updateCommodityByProduct } from '../../../../actions/commodityActionCreator'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import EnumService from '../../../../services/util/EnumService'
import ProductService from '../../../../services/product/ProductService'
import Base64Service from '../../../../services/app/Base64Service'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'
import { URL } from '../../../../helpers/constants'
import { CustomButtons, CustomResponsiveButtons } from './customButtons'
import { Icon } from '../../../../domain/Icon';


class EditDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }
    
    update(e) {

        e.preventDefault();

        const newInstance = ProductService.setJson(this.props.detailState);

        ProductService.update(newInstance, this.sendButton).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            console.log('ERRO [components\\private\\product\\detail\\EditDetail.js 37]');
        });
    }

    remove(e) {

        ProductService.remove(this.props.detailState.id).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.PRODUCT);
            }
        }).catch(error => {
            console.log('ERRO [components\\private\\product\\detail\\EditDetail.js 49]');
        });
    }
    componentWillUnmount() {
        this.props.clearForm();
    }
    componentDidMount() {
        this.props.findById(Base64Service.decode(this.props.params.id));
    }

    enterCommodity() {
    
        if (this.props.detailState.quantidadeCommodity === '') {
            Toast.show('quantidade.obrigatorio', Icon.WARNING);
            return;
        }

        if (this.props.detailState.precoCustoCommodity === 0) {
            Toast.show('preco.custo.obrigatorio', Icon.WARNING);
            return;
        }
        
        browserHistory.push(URL.NEW_COMMODITY);
        this.props.sendProduct(this.props.detailState.id,this.props.detailState.descricao,this.props.detailState.quantidadeCommodity,this.props.detailState.precoCustoCommodity);
    }

    render() {
        return (

            <Detail
                {... this.props.detailState}
                title="Edição de Produtos"
                merge={this.update.bind(this)}
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
                updateTableItens={this.props.updateTableItens}
                updateGroupProductTableItens={this.props.updateGroupProductTableItens}
                changeGroupProductRadio={this.props.changeGroupProductRadio}
                removeGroupProduct={this.props.removeGroupProduct}
                submitRef={el => this.sendButton = el}
                handleInputChange={this.props.handleInputChange}
                handleCheckbox={this.props.handleCheckbox}
                handleNumericChange={this.props.handleNumericChange}
                updateAvailableDays={this.props.updateAvailableDays}
                toggleGroupProductAccordion={this.props.toggleGroupProductAccordion}
                toggleCommodityAccordion={this.props.toggleCommodityAccordion}
                remove={this.remove.bind(this)}
                showModal={this.props.showModal}
                hideModal={this.props.hideModal}
                customResponsiveButtons={<CustomResponsiveButtons showModalCommodity={this.props.showModalCommodity}  />}
                customButtons={<CustomButtons  showModalCommodity={this.props.showModalCommodity}   />}
                enterCommodity={this.enterCommodity.bind(this)}
                hideModalCommodity={this.props.hideModalCommodity}  />
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
        handleNumericChange: (name, value) => {
            if (value !== 0) {
                dispatch(handleInputChange(name, value));
            }
        },
        handleCheckbox: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.checked));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        updateAvailableDays: (chips) => {
            dispatch(updateAvailableDays(chips));
        },
        getProduct: (name, value) => {
            new Promise((resolve) => {
                resolve(dispatch(handleInputChange(name, value)));
            }).then(() => {
                dispatch(ProductService.getProducts(value, updateProductList));
            });
        },
        getGroupProduct: (name, value) => {
            new Promise((resolve) => {
                resolve(dispatch(handleInputChange(name, value)));
            }).then(() => {
                dispatch(GroupProductService.getGroups(value, updateGroupProductList));
            });
        },
        setGroupProduct: (groupProduct) => {
            dispatch(updateGroupProductAutoComplete(groupProduct));
        },
        updateTableItens: () => {
            dispatch(updateTableItens());
        },
        updateGroupProductTableItens: () => {
            dispatch(updateGroupProductTableItens());
        },
        setProduct: (product) => {
            dispatch(updateProductAutoComplete(product));
        },
        removeProduct: (id) => {
            dispatch(removeProduct(id));
        },
        removeGroupProduct: (id) => {
            dispatch(removeGroupProduct(id));
        },
        findById: (id) => {
            new Promise((resolve) => {
                resolve(dispatch(ProductService.findById(id, updateProduct)));
            }).then(() => {
                dispatch(EnumService.load('unidadesmedida', updateUnit));
                dispatch(EnumService.load('tiposArmazenamento', updateStorageProduct));
                dispatch(EnumService.load('diasemana', updateDayOfWeek));
            });
        },
        changeGroupProductRadio: (id) => {
           dispatch(changeGroupProductRadio(id));
        },
        showModal: () => {
            dispatch(showModal());
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        toggleGroupProductAccordion: () => {
            dispatch(toggleGroupProductAccordion());
        },
        toggleCommodityAccordion: () => {
            dispatch(toggleCommodityAccordion());
        },
        showModalCommodity: () => {
            dispatch(showModalCommodity());
        },
        hideModalCommodity: () => {
            dispatch(hideModalCommodity());
        },
        sendProduct: (id,descricao,quantidade,precoCusto) => {
            dispatch(updateCommodityByProduct(id,descricao,quantidade,precoCusto));
        }
    }
}

const EditProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);
export default EditProductDetailContainer;