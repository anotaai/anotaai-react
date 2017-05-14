import React, { Component } from 'react'
import { getObjectNewState } from '../../../helpers/jsonHelper'
import UserService from '../../../services/UserService'
import { browserHistory } from 'react-router'
import { URL } from '../../../helpers/constants'
import Toast from '../../../helpers/Toast'

export default class RenewPassword extends Component {

    constructor(props) {
        super(props);
        this.state = { usuario: { id: '', dataCadastro: '', email: '', telefone: '', senha: '', codigoAtivacao: '' }, confirmarSenha: '' };
        this.activation = this.props.params.activation;
    }
    componentDidMount() {
        if (this.activation) {
            UserService.getUser(this.activation).then(response => {
                this.setState({ usuario: response.entity, confirmarSenha: '' });
            }).catch(error => {
                alert(error);
            });
        }
    }
    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    renew(e) {
        e.preventDefault();

        if (this.state.usuario.senha !== this.state.confirmarSenha) {
            Toast.warning('senhas.nao.conferem.warning');
            return;
        }
        const usuario = this.state.usuario;
        usuario.codigoAtivacao = this.activation;
        UserService.changePassword(usuario)
            .then(response => {
                if (response.isValid) {
                    Toast.success('change.password.success');
                    browserHistory.push(URL.LOGIN);
                } else {
                    Toast.show(response.messages);
                }

            }).catch(error => {
                Toast.error();
            });

    }

    render() {
        return (
            <center>
                <div className="section" />
                <div className="section" />
                <div className="container z-depth-1" style={{ width: '25%' }}>
                    <div className="panel-header">
                        <span className="title-header">Redefinir Senha</span>
                    </div>
                    <div>
                        <form className="col s12 panel" method="post" onSubmit={this.renew.bind(this)}>
                            <div className="row">
                                <div className="col s2">
                                    <i className="material-icons right" style={{ marginTop: '5px' }}>account_circle</i>
                                </div>
                                {this.state.usuario.email != null &&
                                    <div className="col s7 left-align">
                                        {this.state.usuario.email}
                                    </div>
                                }
                                {this.state.usuario.telefone != null &&
                                    <div className="col s7 left-align">
                                        ({this.state.usuario.telefone.ddd}) {this.state.usuario.telefone.numero}
                                    </div>
                                }
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="senha" type="password" name="usuario.senha" value={this.state.usuario.senha} onChange={this.handleInputChange.bind(this)} required />
                                    <label htmlFor="senha">Senha</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="confirmarSenha" type="password" name="confirmarSenha" value={this.state.confirmarSenha} onChange={this.handleInputChange.bind(this)} required />
                                    <label htmlFor="confirmarSenha">Confirmar Senha </label>
                                </div>
                            </div>
                            <div className="row">
                                <button type="submmit" className='col s12 waves-effect btn btn-large success'>Gerar Nova Senha</button>
                            </div>
                        </form>
                    </div>
                </div>
            </center>

        )
    }

}