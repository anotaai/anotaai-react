import React, { Component } from 'react';
import ModalConfirm from  '../../../ModalConfirm'
import NoResults from '../../templatesearch/noResults'
import { pushEncoded } from '../../../App'
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
                                <th className="row-th">Descrição</th>
                                <th className="row-th">Dia Base</th>
                                <th className="row-th">Duração Folha</th>
                                <th className="row-th">Excluir</th>

                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => {
                                return (
                                    <tr key={result.id}>
                                       <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.configuracao.id)}  className="row-td">{result.descricao}</td>
                                       <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.configuracao.id)}  className="row-td">{result.configuracao.diaBase}</td>
                                       <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.configuracao.id)}  className="row-td">{result.configuracao.qtdDiasDuracaoFolha}</td>
                                       <td  className="row-td"><a onClick={this.props.showModal.bind(this,result.id)} style={{color:'black'}}><i className="material-icons">delete</i></a></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    <ModalConfirm text="Confirma a exclusão da caderneta?" confirm={this.props.remove !== undefined ? this.props.remove.bind(this) : undefined} hideModal={this.props.hideModal} showModalState={this.props.showModalState} />
                </div>
            );

        } else {
            return <NoResults />
        }
    }

}