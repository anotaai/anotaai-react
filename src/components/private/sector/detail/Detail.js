import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL } from '../../../../helpers/constants'

export function stateJsonDetail() {
    return {
        id: '',
        nome: '',
        descricao: ''
     }
}


export default class Detail extends Component {

    render() {
        
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.props.merge.bind(this)}>
                            <div className="container">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="nome" ref="nome" value={this.props.nome} name="nome" required onChange={this.props.handleInputChange.bind(this)} type="text" />
                                        <label htmlFor="nome" className={this.props.activeClass === 'S' && this.props.nome != null ? 'active' : ''}>Nome</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricao" type="text" required value={this.props.descricao} name="descricao" onChange={this.props.handleInputChange.bind(this)} />
                                        <label htmlFor="descricao" className={this.props.activeClass === 'S' && this.props.descricao != null ? 'active' : ''} >Descrição</label>
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail customButtons={this.props.customButtons}  customResponsiveButtons={this.props.customResponsiveButtons} searchUrl={URL.SECTOR} submitRef={this.props.submitRef}   />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}