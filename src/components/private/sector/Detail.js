import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { PanelHeader, PanelFooterDetail } from '../../panels'
import { URL } from '../../../helpers/constants'
import { getObjectNewState } from '../../../helpers/jsonHelper'

class Detail extends Component {


    constructor() {
        super();
        this.state = {
            setor: { descricao: '', nome: '' }
        }
    }

    clearForm() {

    }

    update() {
        
    }

    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label="Setor" />
                    <div className="panel row">
                        <form onSubmit={this.update.bind(this)}>
                            <div className="input-field col s12 m12 l9 offset-l2">
                                <input id="nome" value={this.state.descricao} name="setor.nome" required onChange={this.handleInputChange.bind(this)} type="text" />
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div className="input-field col s12 m12 l9 offset-l2">
                                <input id="descricao" type="text" required value={this.state.nome} name="setor.descricao" onChange={this.handleInputChange.bind(this)} />
                                <label htmlFor="descricao">Descrição</label>
                            </div>
                           
                            <PanelFooterDetail clearForm={this.clearForm.bind(this)} searchUrl={URL.SECTOR} />
                            
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoading: () => {
            dispatch(showLoading());
        },
        hideLoading: () => {
            dispatch(hideLoading());
        }
    }
}

const DetailContainer = connect(mapDispatchToProps)(Detail);

export default DetailContainer;