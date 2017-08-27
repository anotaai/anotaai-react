import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import EnumService from '../../../services/util/EnumService';
import AddressService from '../../../services/register/AddressService';
import Toast from '../../../helpers/Toast';
import { replaceMask } from '../../../helpers/stringHelper';
import ClientService from '../../../services/ClientService';
import FormUser from './FormUser';
import { PanelHeader , PanelFooter } from '../../panels';
import { browserHistory } from 'react-router';
import { URL } from '../../../helpers/constants';
import { Icon } from '../../../domain/Icon';
import { handleInputChange, clearForm, clearAddress, updateEnum, handlePhoneChange, clearPassword } from '../../../actions/vendedorActionCreator';
import { connect } from 'react-redux';

 class Vendedor extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    componentDidMount() {
        this.props.loadEnum();
    }

     componentWillUnmount() {
        this.props.clearForm();
    }

     clearForm(e) {
         e.preventDefault();
         this.props.clearForm();
    }

    save(e) {
        e.preventDefault();
        
        if (this.props.vendedorState.usuario.senha !== this.props.vendedorState.confirmarSenha) {
             Toast.show('usuario.senha.naoconfere', Icon.WARNING);
             this.props.clearPassword();
        } else {
            
            ClientService.save(this.props.vendedorState.cliente, this.props.vendedorState.usuario, this.props.vendedorState.telefone, this.sendButton).then(response => {
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
        this.props.handleInputChange(e);

        if (finalizouCep === -1 && cepReplace !== '') {
            this.props.findCep(cepReplace);
        } else {
            this.props.clearAddress();
        }
    }

    render() {

        const active = (this.props.vendedorState.cepRetornado === 'S' ? 'active-label' : '');
        const disabled = (this.props.vendedorState.cepRetornado === 'S' ? 'disabled' : '');

        return (
            <form  method="post" onSubmit={this.save.bind(this)}>

                <FormUser {... this.props.vendedorState}  handleInputChange={this.props.handleInputChange} handlePhoneChange={this.props.handlePhoneChange} />

                <div className="vendedor-space-container container">
                    
                    <PanelHeader label="Dados Endereço" icon="home" />

                    <div className="panel row">

                        <div className="input-field col s12 m6 l6">
                            <MaskedInput id='cep' ref="cep" value={this.props.vendedorState.cliente.endereco.cep} mask="11.111-111" required placeholder="Cep" name="cliente.endereco.cep" onChange={this.handleCepChange.bind(this)} />
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="logradouro" value={this.props.vendedorState.cliente.endereco.logradouro} disabled={disabled} type="text" name="cliente.endereco.logradouro" onChange={this.props.handleInputChange} />
                            <label htmlFor="logradouro" className={active}>Logradouro</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="numero" type="number" value={this.props.vendedorState.cliente.endereco.numero} name="cliente.endereco.numero" onChange={this.props.handleInputChange} />
                            <label htmlFor="numero" className={active} >Número</label>
                        </div>
                        <div className="input-field col s12 m6 l6">
                            <input id="complemento" type="text" value={this.props.vendedorState.cliente.endereco.complemento} name="cliente.endereco.complemento" onChange={this.props.handleInputChange} />
                            <label htmlFor="complemento" className={active}>Complemento</label>
                        </div>

                        <div className="input-field col s12 m6 l6">
                            <label htmlFor="estado" className="active">Estado</label>
                            <select id="estado" className="browser-default" disabled={disabled} onChange={this.props.handleInputChange} value={this.props.vendedorState.cliente.endereco.estado} name="cliente.endereco.estado"   >
                                <option value=""></option>
                                {this.props.vendedorState.estadoList.map(estado => (<option key={estado.type} value={estado.type}>{estado.descricao}</option>))}
                            </select>
                        </div>

                        <div className="input-field col s12 m6 l6">
                            <input id="cidade" type="text" name="cliente.endereco.cidade" required disabled={disabled} value={this.props.vendedorState.cliente.endereco.cidade} onChange={this.props.handleInputChange} />
                            <label htmlFor="cidade" className={active}>Cidade</label>
                        </div>

                        <div className="input-field col s12 m6 l6">
                            <input id="bairro" type="text" name="cliente.endereco.bairro" onChange={this.props.handleInputChange} disabled={disabled} required value={this.props.vendedorState.cliente.endereco.bairro} />
                            <label htmlFor="bairro" className={active} disabled>Bairro</label>
                        </div>
                        <PanelFooter submitRef={el => this.sendButton = el}  clearForm={this.clearForm.bind(this)} label="Enviar" public />
                    </div>
                </div>
            </form>)
    }

}

const mapStateToProps = state => {
    return { vendedorState: state.vendedor }
}

 const mapDispatchToProps = dispatch => {

    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },
        handlePhoneChange: (e) => {
            dispatch(handlePhoneChange(e));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        clearAddress: () => {
            dispatch(clearAddress());
        },
        loadEnum: () => {
           dispatch(EnumService.load('estados',updateEnum));
        },
        findCep: (cep) => {
           dispatch(AddressService.findCep(cep));
        }, 
        clearPassword: () => {
           dispatch(clearPassword());
        }
    }
}

const VendedorContainer = connect(mapStateToProps,mapDispatchToProps)(Vendedor);

export default VendedorContainer;