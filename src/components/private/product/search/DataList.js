import React, { Component } from 'react';
import { pushEncoded } from '../../../App'
import ModalConfirm from  '../../../ModalConfirm'
import NoResults from '../../templatesearch/noResults'
import { TABLE_DEFAULT_CSS } from '../../../../helpers/constants'

export default class DataList extends Component {
 

    render() {

        const results = this.props.filteredResults;

        if (results.length > 0) {
            return (
                <div>
                    <table className={TABLE_DEFAULT_CSS}>
                        <thead>
                            <tr>
                                <th className="row-th">Código</th>
                                <th className="row-th">Descrição</th>
                                <th className="row-th">R$ Custo</th>
                                <th className="row-th">R$ Venda</th>
                                <th className="row-th">Estoque</th>
                                <th className="row-th">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => {
                                return (
                                    <tr key={result.id}>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.codigo}</td>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.descricao}</td>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.estoque.precoCusto}</td>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.precoVenda}</td>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.estoque.quantidadeEstoque}&nbsp;{result.unidadeMedida.sigla}</td>
                                        <td  className="row-td"><a onClick={this.props.showModal.bind(this,result.id)} style={{color:'black'}}><i className="material-icons">delete</i></a></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    <ModalConfirm content="Confirma a exclusão do produto?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
                </div>
            );

        } else {
            return <NoResults />
        }
    }

}