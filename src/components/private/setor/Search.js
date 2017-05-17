import React, { Component } from 'react'
import FooterPanel from '../../FooterPanel'

export default class Search extends Component {


    search(e) {
       e.preventDefault();
    }


    clearForm(e) {
       e.preventDefault();
    }


    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <div className="panel-header">
                        <span className="title-header"> <i className="material-icons icon-panel">business_center</i> Setor </span>
                    </div>
                    <div className="panel">
                        <form onSubmit={this.search.bind(this)}>


                            <FooterPanel clearForm={this.clearForm.bind(this)} label="Pesquisar" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}