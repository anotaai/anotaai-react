import React, { Component } from 'react';
import ModalConfirm from  '../../../ModalConfirm'
import NoResults from '../../templatesearch/noResults'
import { TABLE_DEFAULT_CSS } from '../../../../helpers/constants'
import { pushEncoded } from '../../../App'

export default class DataList extends Component {
 
 
    render() {

        const results = this.props.filteredResults;

        if (results.length > 0) {
            return (
                <div>
                    <table className={TABLE_DEFAULT_CSS}>
                        <thead>
                            <tr>
                                <th className="row-th">Data entrada</th>
                                <th className="row-th">R$ Quantitativo Custo da Entrada</th>
                                <th className="row-th">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => {
                                return (
                                     <tr key={result.id}>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{new Date(result.dataEntrada).toLocaleDateString()}</td>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.quantitativoCusto}</td>
                                        <td  className="row-td"><a onClick={this.props.showModal.bind(this,result.id)} style={{color:'black'}}><i className="material-icons">delete</i></a></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    <ModalConfirm text="Confirma a exclusão da Entrada de Mercadoria?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
                </div>
            );

        } else {
            return <NoResults />
        }
    }

}