import React, { Component } from 'react';

export default class Filters extends Component {

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="input-field col s12 m12 l12">
                        <input id="nomeSetor" type="text" value={this.props.nomeSetor} onChange={this.props.handleInputChange.bind(this)} name="nomeSetor" />
                        <label htmlFor="nomeSetor">Nome</label>
                    </div>
                </div>
            </div>);
    }
} 