import React, { Component } from 'react';

export default class Filters extends Component {

    render() {

        return (
            <div className="container">
                <div className="row input-field">
                    <input id="nomeSetor" className="col s12 m12 l12" type="text" required />
                    <label htmlFor="nomeSetor">Nome</label>
                </div>
            </div>);
    }
} 