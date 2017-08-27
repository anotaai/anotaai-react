import React, { Component } from 'react'
import UserService from '../../../services/UserService'
import { browserHistory } from 'react-router'
import { URL, USE_CASE } from '../../../helpers/constants'
import Toast from '../../../helpers/Toast'
import { Icon } from '../../../domain/Icon'
import { connect } from 'react-redux'
import { handleInputChange, clearForm, clearPassword } from '../../../actions/userActionCreator'

class RenewPassword extends Component {


    componentWillUnmount() {
        this.props.clearForm();
    }

    componentDidMount() {
        if (this.props.params.activation) {
            this.props.getUser(this.props.params.activation);
        }
    }


    renew(e) {
        e.preventDefault();
        if (this.props.renewState.userLogin.usuario.senha !== this.props.renewState.confirmarSenha) {
            Toast.show('usuario.senha.naoconfere', Icon.ERROR);
            this.props.clearPassword();
        } else {

      
            UserService.changePassword(this.props.renewState.userLogin.usuario, this.refs.newPassword).then(response => {
                Toast.show(response.messages);
                if (response.isValid) {
                    browserHistory.push(URL.LOGIN);
                }
            }).catch(error => {
                Toast.defaultError();
            });
        }
    }

    render() {

        if (this.props.renewState.userLogin.usuario.id !== null) {
            return (
                <center className="space-container">
                    <div className="container" style={{ width: '25%' }}>
                        <div className="panel-header">
                            <span className="title-header">Redefinir Senha</span>
                        </div>
                        <div>
                            <form className="panel col s12" method="post" onSubmit={this.renew.bind(this)}>
                                <div className="row">
                                    <div className="col s2">
                                        <i className="material-icons right" style={{ marginTop: '5px' }}>account_circle</i>
                                    </div>
                                    {this.props.renewState.userLogin.usuario.email != null &&
                                        <div className="col s7 left-align">
                                            {this.props.renewState.userLogin.usuario.email}
                                        </div>
                                    }
                                    {this.props.renewState.userLogin.usuario.telefone != null &&
                                        <div className="col s7 left-align">
                                            ({this.props.renewState.userLogin.usuario.telefone.ddd}) {this.props.renewState.userLogin.usuario.telefone.numero}
                                        </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="senha" ref="senha" type="password" name="userLogin.usuario.senha" value={this.props.renewState.userLogin.usuario.senha} onChange={this.props.handleInputChange} required />
                                        <label htmlFor="senha">Senha</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="confirmarSenha" type="password" name="confirmarSenha" value={this.props.renewState.confirmarSenha} onChange={this.props.handleInputChange} required />
                                        <label htmlFor="confirmarSenha">Confirmar Senha </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <button ref="newPassword" type="submmit" className='col s12 waves-effect btn btn-large success'>Gerar Nova Senha</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </center>
            )
        } else
            return null

    }
}

const mapStateToProps = state => {
    return { renewState: state.renew }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(USE_CASE.RENEW, e.target.name, e.target.value));
        },
        getUser: (code) => {
            dispatch(UserService.getUser(code));
        },
        clearForm: () => {
            dispatch(clearForm(USE_CASE.RENEW));
        },
        clearPassword: () => {
            dispatch(clearPassword(USE_CASE.RENEW));
        }
    }
}

const RenewPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(RenewPassword);

export default RenewPasswordContainer;