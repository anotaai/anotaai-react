import React, { Component } from 'react'
import { connect } from 'react-redux'
import Base64Service from '../../../services/app/Base64Service'
import CommodityService from '../../../services/commodity/CommodityService'
import { updateState } from '../../../actions/commodityActionCreator'
import { PanelHeader } from '../../panels'
import { TABLE_DEFAULT_CSS } from '../../../helpers/constants'
import { PanelFooterDetail } from '../../panels'


class DeleteCommodity extends Component {

    componentDidMount() {
        this.props.deleteCommodity(Base64Service.decode(this.props.params.id));
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <form>
                <div className="space-container">
                    <div className="container">
                        <PanelHeader icon="list" label="Estorno Mercadoria" />
                        <div className="panel row">
                            <div className="col s12 m12 l12">
                                <label style={{ fontWeight: 'bold' }}> Código </label>
                                <label> {this.props.detailState.codigo} </label>
                            </div>
                            <div className="col s12 m12 l12">
                                <label style={{ fontWeight: 'bold' }}> Data entrada </label>
                                <label> {this.props.detailState.dataEntrada} </label>
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
                                                            <input type="checkbox" id="estonar" name="estonar" onClick={this.props.delete} />
                                                            <label htmlFor="estonar">Estornar</label>
                                                        </td>
                                                        <td className="row-td-detail">{item.movimentacaoProduto.produto.descricao}</td>
                                                    </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <PanelFooterDetail />
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
        deleteCommodity: (id) => {
            dispatch(CommodityService.deleteCommodity(id, updateState));
        }
    }
}
const DeleteCommodityContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteCommodity);

export default DeleteCommodityContainer;