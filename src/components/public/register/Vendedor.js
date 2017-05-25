import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import EnumService from '../../../services/util/EnumService';
import AddressService from '../../../services/register/AddressService';
import Toast from '../../../helpers/Toast';
import { getObjectNewState, createInstance } from '../../../helpers/jsonHelper';
import { replaceMask } from '../../../helpers/stringHelper';
import ClientService from '../../../services/ClientService';
import FormUser , { checkInvalidPassword } from './FormUser';
import { PanelHeader , PanelFooter } from '../../panels'
import { browserHistory } from 'react-router';
import { URL } from '../../../helpers/constants';
import { Icon } from '../../../domain/Icon';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { connect } from 'react-redux'

 class Vendedor extends Component {

    constructor() {
        super();
        this.cepRetornado = '';
        this.sendButton = null;
        this.nameInput= null;
        this.state = {
            usuario: { nome: '', email: '', senha: '' },
            cliente: { nomeComercial: '', cpf: '', endereco: { cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' } },
            estadoList: [],
            confirmarSenha: '',
            telefone: '',
            telefoneRetornado: '' 
        };
    }

    componentDidMount() {
        EnumService.load('estados').then(json => {
            this.setState({ estadoList: json });
        }).catch(error => {
            Toast.defaultError();
        });
    }

    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }


    clearForm(e) {
        e.preventDefault();
        const newState = createInstance(this.state);
        this.clearAddress(newState);
        newState.cliente.cpf = '';
        newState.cliente.nomeComercial = '';
        newState.usuario.nome = '';
        newState.usuario.email = '';
        newState.usuario.senha = '';
        newState.confirmarSenha = '';
        newState.telefone = '';
        this.setState(newState);
        this.nameInput.focus();
    }

    clearAddress(newState) {
        this.cepRetornado = '';
        newState.cliente.endereco.cep = '';
        newState.cliente.endereco.logradouro = '';
        newState.cliente.endereco.numero = '';
        newState.cliente.endereco.complemento = '';
        newState.cliente.endereco.bairro = '';
        newState.cliente.endereco.cidade = '';
        newState.cliente.endereco.estado = '';
    }

    send(e) {
        e.preventDefault();

        const invalideState = checkInvalidPassword(this.state);

        if (invalideState !== undefined) {
            this.setState(invalideState);
        } else {
            
            this.props.showLoading();
            this.sendButton.setAttribute('disabled','disabled');
            ClientService.save(this.state.cliente, this.state.usuario, this.state.telefone).then(response => {
                 Toast.show(response.messages);
                 if (response.isValid) {
                    browserHistory.push(URL.LOGIN);
                 }
            }).catch(error => {
                Toast.defaultError();
            }).then(()=> {
               
                if(this.sendButton !== undefined) {
                  this.sendButton.removeAttribute('disabled');
                }  
                 this.props.hideLoading();
            });
        }

    }

    handlePhoneChange(entity) {
        const newState = createInstance(this.state);
        newState.usuario.nome  = entity.nome;
        newState.usuario.email = entity.email;
        newState.telefoneRetornado = 'S';
        this.setState(newState);
     }

    handleCepChange(e) {

        const cep = e.target.value;
        const cepReplace = replaceMask(cep);
        const finalizouCep = cepReplace.indexOf('_');
        this.handleInputChange(e);

        if (finalizouCep === -1 && cepReplace !== '') {
            this.props.showLoading();
            AddressService.findCep(cepReplace).then(enderecoRecuperado => {

                if (enderecoRecuperado.logradouro == null) {
                    Toast.show('cep.nao.localizado', Icon.WARNING);
                } else {
                    const newState = createInstance(this.state);
                    newState.cliente.endereco.logradouro = enderecoRecuperado.logradouro;
                    newState.cliente.endereco.bairro = enderecoRecuperado.bairro;
                    newState.cliente.endereco.cidade = enderecoRecuperado.localidade;
                    newState.cliente.endereco.estado = enderecoRecuperado.uf;
                    this.cepRetornado = 'S';
                    this.setState(newState);
                }
            }).catch(error => {
                Toast.defaultError();
            }).then(() => {
                 this.props.hideLoading();
            });

        } else {
            const newState = createInstance(this.state);
            this.clearAddress(newState);
            this.setState(newState);
        }

    }

    render() {

        const active = (this.cepRetornado === 'S' ? 'active-label' : '');
        const disabled = (this.cepRetornado === 'S' ? 'disabled' : '');

        return (
            <form method="post" onSubmit={this.send.bind(this)}>

                <FormUser {... this.state}  inputRef={el => this.nameInput = el} handleInputChange={this.handleInputChange.bind(this)} handlePhoneChange={this.handlePhoneChange.bind(this)} />

                <div className="container">
                    
                    <PanelHeader label="Dados Endereço" icon="home" />

                    <div className="panel row">

                        <div className="input-field col s12 m6 l6">
                            <MaskedInput id='cep' ref="cep" value={this.state.cliente.endereco.cep} mask="11.111-111" required placeholder="Cep" name="cliente.endereco.cep" onChange={this.handleCepChange.bind(this)} />
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="logradouro" value={this.state.cliente.endereco.logradouro} disabled={disabled} type="text" name="cliente.endereco.logradouro" onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="logradouro" className={active}>Logradouro</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="numero" type="number" value={this.state.cliente.endereco.numero} name="cliente.endereco.numero" onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="numero" className={active} >Número</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="complemento" type="text" value={this.state.cliente.endereco.complemento} name="cliente.endereco.complemento" onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="complemento" className={active}>Complemento</label>
                        </div>

                        <div id="estadosDiv" className="input-field col s12 m6 l6">
                            <select className="browser-default" disabled={disabled} onChange={this.handleInputChange.bind(this)} value={this.state.cliente.endereco.estado} name="cliente.endereco.estado"   >
                                <option value="">Selecione o estado</option>
                                {this.state.estadoList.map(estado => (<option key={estado.type} value={estado.type}>{estado.descricao}</option>))}
                            </select>
                        </div>

                        <div className="input-field col s12 m6 l6">
                            <input id="cidade" type="text" name="cliente.endereco.cidade" required disabled={disabled} value={this.state.cliente.endereco.cidade} onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="cidade" className={active}>Cidade</label>
                        </div>

                        <div className="input-field col s12 m6 l6">
                            <input id="bairro" type="text" name="cliente.endereco.bairro" onChange={this.handleInputChange.bind(this)} disabled={disabled} required value={this.state.cliente.endereco.bairro} />
                            <label htmlFor="bairro" className={active} disabled>Bairro</label>
                        </div>
                    </div>
                </div>
                <PanelFooter submitRef={el => this.sendButton = el}  clearForm={this.clearForm.bind(this)} label="Enviar" isPublic={true} />
            </form>)
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

const VendedorContainer = connect(null,mapDispatchToProps)(Vendedor);

export default VendedorContainer;