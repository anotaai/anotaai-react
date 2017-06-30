import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange, updateUnit, updateDayOfWeek, updateAvailableDays, newDefaultValues, 
    updateProductAutoComplete, updateTableItens } from '../../../../actions/productActionCreator'
import EnumService from '../../../../services/util/EnumService'
import ProductService from '../../../../services/product/ProductService'




class NewDetail extends Component {


    componentDidMount() {
        this.props.loadUnityEnum();
        this.props.loadDayOfWeekEnum();
        this.props.newDefaultValues();
    }

    componentWillUnmount() {
        this.props.clearForm();
    }


    save(e) {
        e.preventDefault();
    }


    render() {
        return (
            <Detail
                title="Cadastro de Produtos"
                id={this.props.detailState.id}
                codigoGerado={this.props.detailState.codigoGerado}
                ehInsumo={this.props.detailState.ehInsumo}
                codigo={this.props.detailState.codigo}
                descricao={this.props.detailState.descricao}
                descricaoResumida={this.props.detailState.descricaoResumida}
                unidadeMedida={this.props.detailState.unidadeMedida}
                precoVenda={this.props.detailState.precoVenda}
                blockCode={this.props.detailState.blockCode}
                unidadeList={this.props.detailState.unidadeList}
                diasDisponibilidade={this.props.detailState.diasDisponibilidade}
                diasSemana={this.props.detailState.diasSemana}
                produtos={this.props.detailState.produtos}
                produtoSelecionado={this.props.detailState.produtoSelecionado}
                itensReceita={this.props.detailState.itensReceita}
                getProduct={this.props.getProduct}
                setProduct={this.props.setProduct}
                updateTableItens={this.props.updateTableItens}
                merge={this.save.bind(this)}
                submitRef={el => this.sendButton = el}
                handleInputChange={this.props.handleInputChange}
                handleCheckbox={this.props.handleCheckbox}
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

        handleCheckbox: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.checked));
        },

        clearForm: () => {
            dispatch(clearForm());
        },

        loadUnityEnum: () => {
            dispatch(EnumService.load('unidadesmedida', updateUnit));
        },

        loadDayOfWeekEnum: () => {
            dispatch(EnumService.load('diasemana', updateDayOfWeek));
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
                dispatch(ProductService.getProducts(value));
            });

        },

        updateTableItens: () => {
           dispatch(updateTableItens());
        },

        setProduct: (product) => {
            dispatch(updateProductAutoComplete(product));
        }
    }
}

const NewProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(NewDetail);
export default NewProductDetailContainer;