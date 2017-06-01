import React, { Component } from 'react';

export default class Filters extends Component {

    render() {

        return (
            <div className="container">

                <div className="row">
                    <div className="input-field col s12 m12 l12">
                        <input id={this.props.basicId} type="text" value={this.props.basicField} onChange={this.props.handleInputChange.bind(this)} name={this.props.basicId} />
                        <label htmlFor={this.props.basicId}>{this.props.basicLabel}</label>
                    </div>
                </div>
                {this.props.customFilters}
            </div>);
    }
} 