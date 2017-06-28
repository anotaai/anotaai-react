import React, { Component } from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import { clearForm, handleInputChange, updateUnit, updateDayOfWeek, updateAvailableDays } from '../../../../actions/productActionCreator'
import EnumService from '../../../../services/util/EnumService'


class NewDetail extends Component {


    componentDidMount() {
        this.props.loadUnityEnum();
        this.props.loadDayOfWeekEnum();
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
                codigo={this.props.detailState.codigo}
                descricao={this.props.detailState.descricao}
                descricaoResumida={this.props.detailState.descricaoResumida}
                unidadeMedida={this.props.detailState.unidadeMedida}
                precoVenda={this.props.detailState.precoVenda}
                unidadeList={this.props.detailState.unidadeList}
                diasDisponibilidades={this.props.detailState.diasDisponibilidades}
                diasSemana={this.props.detailState.diasSemana}
                merge={this.save.bind(this)}
                submitRef={el => this.sendButton = el}
                handleInputChange={this.props.handleInputChange}
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

        clearForm: () => {
            dispatch(clearForm());
        },

        loadUnityEnum: () => {
           dispatch(EnumService.load('unidadesmedida',updateUnit));
        },

        loadDayOfWeekEnum: () => {
           dispatch(EnumService.load('diasemana',updateDayOfWeek));
        },

        updateAvailableDays: (chips) => {
           dispatch(updateAvailableDays(chips));
        }
    }
}

const NewProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(NewDetail);
export default NewProductDetailContainer;