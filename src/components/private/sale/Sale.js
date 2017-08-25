import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInputChange } from '../../../actions/saleActionCreator'
import { PanelHeader, PanelSale } from '../../panels'
import { TABLE_DEFAULT_CSS } from '../../../helpers/constants'


class Sale extends Component {

    save(e) {
        e.preventDefault();
    }


    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="mode_edit" label="Venda" />
                    <div className="panel">
                        <form onSubmit={this.save.bind(this)}>
                                <div className="row">
                                    <div className="col l4">
                                        <div className="row">
                                            <div className="input-field col s12 m12 l12">
                                                <input id="produto" value={this.props.produto} name="produto" required onChange={this.props.handleInputChange} type="text" />
                                                <label htmlFor="produto">Produto</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12 m12 l12">
                                                <input id="quantidade" value={this.props.quantidade} name="quantidade" required onChange={this.props.handleInputChange} type="number" />
                                                <label htmlFor="quantidade">Quantidade</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12 m12 l12">
                                                <input id="consumidor" ref="consumidor" value={this.props.consumidor} name="consumidor" required onChange={this.props.handleInputChange} type="text" />
                                                <label htmlFor="consumidor">Consumidor</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col offset-l1 l7">
                                        <div className="row">
                                            <div className="sales-table">
                                                <table className={TABLE_DEFAULT_CSS}>
                                                    <thead>
                                                        <tr>
                                                            <th className="row-th"> Código </th>
                                                            <th className="row-th"> Descrição do Produto </th>
                                                            <th className="row-th"> Quantidade </th>
                                                            <th className="row-th"> Valor Unitário </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12 offset-m7 offset-l7 m5 l5">
                                                <h5 className="sales-total"> Total: 0,00 R$ </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <PanelSale />
                        </form>
                    </div>
                </div>

            </div>
        )
    }


}

const mapStateToProps = state => {
    return { saleState: state.saleReducer }
}
const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        }
    }
}


const SaleContainer = connect(mapStateToProps, mapDispatchToProps)(Sale);
export default SaleContainer;