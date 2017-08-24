import React, { Component } from 'react';
import ModalConfirm from  '../../../ModalConfirm'
import NoResults from '../../templatesearch/noResults'
import { TABLE_DEFAULT_CSS } from '../../../../helpers/constants'
import { URL } from '../../../../helpers/constants'
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
                                <th className="row-th">Código</th>
                                <th className="row-th">Data entrada</th>
                                <th className="row-th">Estornar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => {

                                return (
                                     <tr key={result.id}>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.codigo}</td>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{new Date(result.dataEntrada).toLocaleDateString()}</td>
                                        <td  className="row-td"><a onClick={pushEncoded.bind(this,URL.MAIN_DELETE_COMMODITY,result.id)} style={{color:'black'}}><i className="material-icons">delete</i></a></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    <ModalConfirm content="Confirma a exclusão da Entrada de Mercadoria?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
                </div>
            );

        } else {
            return <NoResults />
        }
    }

}