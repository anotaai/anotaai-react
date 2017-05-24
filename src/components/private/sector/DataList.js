import React, { Component } from 'react';

export default class DataList extends Component {


    render() {

        const results = this.props.filteredResults;

        if (results.length > 0) {
            return (
                <div>
                    <table className="striped bordered responsive-table">
                        <thead>
                            <tr>
                                <th className="row-th">Nome</th>
                                <th className="row-th">Descrição</th>
                                <th className="row-th">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => {
                                return (

                                    <tr key={result.id}>
                                        <td className="row-td">{result.nome}</td>
                                        <td className="row-td">{result.descricao}</td>
                                        <td className="row-td"><a href="#" onClick={this.props.removeItem.bind(this,result.id)} style={{color:'black'}}><i className="material-icons">delete</i></a></td>
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