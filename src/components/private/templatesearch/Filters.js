import React, { Component } from 'react';

export default class Filters extends Component {

    render() {

        return (
            <div className="container">
                {this.props.filters.map(filterObj => {
                  return (  
                    <div key={filterObj.id} className="row">
                        <div className="input-field col s12 m12 l12">
                            <input id={filterObj.id} type={filterObj.type == null ? "text" : filterObj.type } value={filterObj.basicField} onChange={this.props.handleInputChange.bind(this)} name={filterObj.id} />
                            <label htmlFor={filterObj.id}>{filterObj.label}</label>
                        </div>
                    </div>)
                })}
            </div>);
    }
} 