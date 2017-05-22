import React, { Component } from 'react';

export default class DataList extends Component {


    render() {

        const results = this.props.filteredResults;

        if (results.length > 0) {
            return (
                <div>
                    <table className="striped">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => {
                                return (

                                    <tr key={result.id}>
                                        <td>{result.nome}</td>
                                        <td>{result.descricao}</td>
                                        <td><i className="material-icons">delete</i></td>
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