import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaskedInput from 'react-maskedinput';
import EnumService from '../../../services/util/EnumService';
import AddressService from '../../../services/register/AddressService';
import Toast from '../../../helpers/Toast';
import { getObjectNewState, createInstance } from '../../../helpers/jsonHelper';
import { replaceMask } from '../../../helpers/stringHelper';
import ClientService from '../../../services/ClientService';
import { FormUser, checkInvalidPassword } from './Comprador';
import FooterPanel from '../../FooterPanel';
import { browserHistory } from 'react-router';
import { URL } from '../../../helpers/constants';
import { Icon } from '../../../domain/Icon';

export default class Vendedor extends Component {

    constructor() {
        super();
        this.cepRetornado = '';
        this.state = {
            usuario: { nome: '', email: '', senha: '' },
            cliente: { nomeComercial: '', cpf: '', endereco: { cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' } },
            estadoList: [],
            confirmarSenha: '',
            telefone: ''
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
        //ReactDOM.findDOMNode(this.refs.formUser.nome).focus();

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
            ReactDOM.findDOMNode(this.refs.senha).focus();
        } else {
            ClientService.save(this.state.cliente, this.state.usuario, this.state.telefone).then(response => {
                Toast.show(response.messages);
                if (response.isValid) {
                    browserHistory.push(URL.LOGIN);
                }
            }).catch(error => {
                Toast.defaultError();
            });
        }

    }



    handleCepChange(e) {

        const cep = e.target.value;
        const cepReplace = replaceMask(cep);
        const finalizouCep = cepReplace.indexOf('_');
        this.handleInputChange(e);

        if (finalizouCep === -1 && cepReplace !== '') {

            AddressService.findCep(cepReplace).then(enderecoRecuperado => {

                if (enderecoRecuperado.logradouro == null) {
                    Toast.show('cep.nao.localizado', Icon.WARNING);
                } else {
                    const newState = createInstance(this.state);
                    newState.cliente.endereco.logradouro = enderecoRecuperado.logradouro;
                    newState.cliente.endereco.numero = enderecoRecuperado.numero;
                    newState.cliente.endereco.complemento = enderecoRecuperado.numero;
                    newState.cliente.endereco.bairro = enderecoRecuperado.bairro;
                    newState.cliente.endereco.cidade = enderecoRecuperado.localidade;
                    newState.cliente.endereco.estado = enderecoRecuperado.uf;
                    this.cepRetornado = 'S';
                    this.setState(newState);
                }
            }).catch(error => {
                Toast.defaultError();
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

                <FormUser ref="formUser" usuario={this.state.usuario} cliente={this.state.cliente} telefone={this.state.telefone} confirmarSenha={this.state.confirmarSenha} handleInputChange={this.handleInputChange.bind(this)} />

                <div className="container">
                    <div className="z-depth-1 panel-header" >
                        <span className="title-header">Dados Endereço</span>
                    </div>
                    <div className="z-depth-1 panel row">

                        <div className="input-field col s6">
                            <MaskedInput id='cep' ref="cep" value={this.state.cliente.endereco.cep} mask="11.111-111" required placeholder="Cep" name="cliente.endereco.cep" onChange={this.handleCepChange.bind(this)} />
                        </div>
                        <div className="input-field col s6">
                            <input id="logradouro" value={this.state.cliente.endereco.logradouro} disabled={disabled} type="text" name="cliente.endereco.logradouro" onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="logradouro" className={active}>Logradouro</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="numero" type="number" value={this.state.cliente.endereco.numero} name="cliente.endereco.numero" onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="numero" className={active} >Número</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="complemento" type="text" value={this.state.cliente.endereco.complemento} name="cliente.endereco.complemento" onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="complemento" className={active}>Complemento</label>
                        </div>

                        <div id="estadosDiv" className="input-field col s6">
                            <select className="browser-default" disabled={disabled} onChange={this.handleInputChange.bind(this)} value={this.state.cliente.endereco.estado} name="cliente.endereco.estado"   >
                                <option value="">Selecione o estado</option>
                                {this.state.estadoList.map(estado => (<option key={estado.type} value={estado.type}>{estado.descricao}</option>))}
                            </select>
                        </div>

                        <div className="input-field col s6">
                            <input id="cidade" type="text" name="cliente.endereco.cidade" required disabled={disabled} value={this.state.cliente.endereco.cidade} onChange={this.handleInputChange.bind(this)} />
                            <label htmlFor="cidade" className={active}>Cidade</label>
                        </div>

                        <div className="input-field col s6">
                            <input id="bairro" type="text" name="cliente.endereco.bairro" onChange={this.handleInputChange.bind(this)} disabled={disabled} required value={this.state.cliente.endereco.bairro} />
                            <label htmlFor="bairro" className={active} disabled>Bairro</label>
                        </div>
                    </div>
                </div>
                <FooterPanel clearForm={this.clearForm.bind(this)} />
            </form>)
    }

}