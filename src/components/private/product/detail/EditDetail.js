import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange, updateUnit, updateDayOfWeek, updateAvailableDays, updateProduct, updateGroupProductAutoComplete,
    updateProductAutoComplete, updateTableItens, removeProduct, showModal, hideModal, updateProductList, changeGroupProductRadio,
    toggleGroupProductAccordion, toggleCommodityAccordion, updateGroupProductList, removeGroupProduct, updateGroupProductTableItens,
    updateStorageProduct
} from '../../../../actions/productActionCreator'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import EnumService from '../../../../services/util/EnumService'
import ProductService from '../../../../services/product/ProductService'
import Base64Service from '../../../../services/app/Base64Service'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'
import { URL } from '../../../../helpers/constants'


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
            Toast.defaultError();
        });
    }

    remove(e) {

        ProductService.remove(this.props.detailState.id).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.PRODUCT);
            }
        }).catch(error => {
            Toast.defaultError();
        });
    }
    componentWillUnmount() {
        this.props.clearForm();
    }
    componentDidMount() {
        this.props.findById(Base64Service.decode(this.props.params.id));
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
                showModalState={this.props.detailState.showModalState} />
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
        }
    }
}

const EditProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);
export default EditProductDetailContainer;