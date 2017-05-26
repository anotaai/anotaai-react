import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { PanelHeader, PanelFooterDetail} from '../../panels'
import { URL } from '../../../helpers/constants'
import { getObjectNewState,createInstance } from '../../../helpers/jsonHelper'
import SectorService from '../../../services/sector/SectorService'
import Toast from '../../../helpers/Toast'

class Detail extends Component {

    constructor() {
        super();
        this.state = {
              descricao: '', nome: '' 
        }
        this.sendButton = null;
    }

    clearForm(e) {
      e.preventDefault();
      const newState = createInstance(this.state);
      newState.descricao = '';
      newState.nome = '';
      this.refs.nome.focus();
      this.setState(newState);
    }

    save(e) {
       e.preventDefault();
       this.props.showLoading();
       this.sendButton.setAttribute("disabled", "disabled");
       
       SectorService.save(this.state).then(response => {
          if(response.isValid) {
             alert('bertos pregos');
          } else {
              Toast.show(response.messages);
          }
       }).catch(error =>{
           Toast.defaultError();
       }).then(() => {
            this.sendButton.removeAttribute("disabled");
              this.props.hideLoading();
       });

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
                    <div className="panel">
                        <form onSubmit={this.save.bind(this)}>
                            <div className="container">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="nome" ref="nome" value={this.state.nome} name="nome" required onChange={this.handleInputChange.bind(this)} type="text" />
                                        <label htmlFor="nome">Nome</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricao" type="text" required value={this.state.descricao} name="descricao" onChange={this.handleInputChange.bind(this)} />
                                        <label htmlFor="descricao">Descrição</label>
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail clearForm={this.clearForm.bind(this)} searchUrl={URL.SECTOR} submitRef={el => this.sendButton = el} />
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



const DetailContainer = connect(null,mapDispatchToProps)(Detail);

export default DetailContainer;