import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange, updateUnit, updateDayOfWeek, updateAvailableDays, updateProduct } from '../../../../actions/productActionCreator'
import EnumService from '../../../../services/util/EnumService'
import ProductService from '../../../../services/product/ProductService'
import Base64Service from '../../../../services/app/Base64Service'


class EditDetail extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    update(e) {
        e.preventDefault();
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
                title="Edição de Produtos"
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
                merge={this.update.bind(this)}
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

        findById: (id) => {
            
            new Promise((resolve) => {
                resolve(dispatch(ProductService.findById(id, updateProduct)));
            }).then(() => {
                dispatch(EnumService.load('unidadesmedida',updateUnit));
                dispatch(EnumService.load('diasemana',updateDayOfWeek));
            });

        },

        updateAvailableDays: (chips) => {
           dispatch(updateAvailableDays(chips));
        }
    }
}

const EditProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);
export default EditProductDetailContainer;