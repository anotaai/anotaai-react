import React, { Component } from 'react'
import { connect } from 'react-redux'
import Base64Service from '../../../services/app/Base64Service'
import CommodityService from '../../../services/commodity/CommodityService'
import { updateState, clearForm } from '../../../actions/commodityActionCreator'
import { PanelHeader } from '../../panels'
import { TABLE_DEFAULT_CSS } from '../../../helpers/constants'
import { PanelFooterDetail } from '../../panels'
import { URL } from '../../../helpers/constants'


class DeleteCommodity extends Component {

    componentDidMount() {
        this.props.getCommodityForDelete(Base64Service.decode(this.props.params.id));
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    render() {
        return (
            <form>
                <div className="space-container">
                    <div className="container">
                        <PanelHeader icon="list" label="Estorno Mercadoria" />
                        <div className="panel row">
                            <div className="col s12 m12 l12">
                                <label className="label-detail"> Código </label>
                                <label> {this.props.detailState.codigo} </label>
                            </div>
                            <div className="col s12 m12 l12">
                                <label className="label-detail"> Data entrada </label>
                                <label> {this.props.detailState.dataEntradaJson} </label>
                            </div>
                            <div className="row">
                                <div className="col s12 m12 l12">
                                    <table className={TABLE_DEFAULT_CSS}>
                                        <thead>
                                            <tr>
                                                <th className="row-th">Ação</th>
                                                <th className="row-th">Produto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.detailState.itens.map(item => {
                                                return (
                                                    <tr key={item.movimentacaoProduto.produto.id}>
                                                        <td className="row-td-detail">
                                                            <input type="checkbox" id={"estornar_"+item.movimentacaoProduto.produto.id}  name="estornar" onClick={this.props.estornar} />
                                                            <label htmlFor={"estornar_"+item.movimentacaoProduto.produto.id}>Estornar</label>
                                                        </td>
                                                        <td className="row-td-detail">{item.movimentacaoProduto.produto.descricao}</td>
                                                    </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <PanelFooterDetail newDetailUrl={URL.NEW_COMMODITY}  />
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return { detailState: state.detailCommodity }
}

const mapDispatchToProps = dispatch => {
    return {
        clearForm: ()  => {
           dispatch(clearForm());
        },
        getCommodityForDelete: (id) => {
            dispatch(CommodityService.getCommodityForDelete(id, updateState));
        }
    }
}
const DeleteCommodityContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteCommodity);

export default DeleteCommodityContainer;