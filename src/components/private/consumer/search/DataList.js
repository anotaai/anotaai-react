import React, { Component } from 'react';
import { pushEncoded } from '../../../App'

export default class DataList extends Component {
 

    render() {

        const results = this.props.filteredResults;

        if (results.length > 0) {
            return (
                <div>
                    <table className="striped bordered">
                        <thead>
                            <tr>
                                <th className="row-th">Nome</th>
                                <th className="row-th">Email</th>
                                <th className="row-th">Telefone</th>
                                <th className="row-th">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => {
                                return (
                                    <tr key={result.id}>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.usuario.nome}</td>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.usuario.email}</td>
                                        <td  onClick={pushEncoded.bind(this,this.props.editUrl,result.id)}  className="row-td">{result.usuario.telefone.numero}</td>
                                        <td  className="row-td"><a href="#" onClick={this.props.remove.bind(this,result.id)} style={{color:'black'}}><i className="material-icons">delete</i></a></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            );

        } else {
            return null;
        }
    }

}