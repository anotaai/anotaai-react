import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange, updateUnit, updateDayOfWeek, updateAvailableDays, newDefaultValues, updateProductAutoComplete, updateTableItens,removeProduct } from '../../../../actions/productActionCreator'
import EnumService from '../../../../services/util/EnumService'
import ProductService from '../../../../services/product/ProductService'
import { URL } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
import Base64Service from '../../../../services/app/Base64Service'
import { browserHistory } from 'react-router'


class NewDetail extends Component {


    componentDidMount() {
        this.props.loadEnum('unidadesmedida',updateUnit);
        this.props.loadEnum('diasemana',updateDayOfWeek);
        this.props.newDefaultValues();
    }

    componentWillUnmount() {
        this.props.clearForm();
    }


    save(e) {

      e.preventDefault();
  
      this.sendButton.setAttribute("disabled", "disabled");

       const newInstance = ProductService.setJson(this.props.detailState);

        ProductService.save(newInstance).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                const id = Base64Service.encode(response.entity.id.toString());
                browserHistory.push(`${URL.PRODUCT}/${id}`);
            } 
        }).catch(error => {
              Toast.defaultError();
         }).then(() => {
              if(this.sendButton != null)
               this.sendButton.removeAttribute("disabled");
        });
    }


    render() {
        
        return (
            <Detail
                title="Cadastro de Produtos"
                merge={this.save.bind(this)}
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
                qtdProduct={this.props.detailState.qtdProduct}
                diasSemana={this.props.detailState.diasSemana}
                produtos={this.props.detailState.produtos}
                produtoSelecionado={this.props.detailState.produtoSelecionado}
                itensReceita={this.props.detailState.itensReceita}
                getProduct={this.props.getProduct}
                setProduct={this.props.setProduct}
                removeProduct={this.props.removeProduct}
                updateTableItens={this.props.updateTableItens}
                submitRef={el => this.sendButton = el}
                handleInputChange={this.props.handleInputChange}
                handleCheckbox={this.props.handleCheckbox}
                handleNumericChange={this.props.handleNumericChange}
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
                dispatch(ProductService.getProducts(value));
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
        }
    }
}

const NewProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(NewDetail);
export default NewProductDetailContainer;