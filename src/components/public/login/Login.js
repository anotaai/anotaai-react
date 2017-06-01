import React, { Component } from 'react'
import ModalRenewPassword from './ModalRenewPassword'
import UserService from '../../../services/UserService'
import { getObjectNewState } from '../../../helpers/jsonHelper'
import Toast from '../../../helpers/Toast'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { connect } from 'react-redux'
import RadioUser from './RadioUser'

class Login extends Component {

  constructor() {
    super();
    this.state = { showModal: false, userLogin: { usuario: { email: '', telefone: '', senha: '' }, tipoAcesso: '' } };
  }

  showModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  handleInputChange(e) {
    const newState = getObjectNewState(e.target.name, e.target.value, this.state);
    this.setState(newState);
  }

  login(e) {
    e.preventDefault();
    this.refs.loginBtn.setAttribute("disabled", "disabled");
    this.props.showLoading();
    UserService.login(this.state.userLogin, this.keepAlive.checked).then(response => {
      if (response.isValid) {
        this.props.login(response.login);
      } else {
        Toast.show(response.messages);
        this.clearPassword();
      }
    }).catch(error => {
      Toast.defaultError();
    }).then(() => {
      if (this.refs.loginBtn !== undefined) {
        this.refs.loginBtn.removeAttribute("disabled");
        this.clearPassword();
      }
      this.props.hideLoading();
    });
  }

  clearPassword() {
    this.refs.senha.value = '';
    this.refs.senha.focus();
  }

  render() {

    return (
      <main className="space-container"> 
        <center>
          <div className="hide-on-small-only">
            <div className="section" />
          </div>
        
          <h5 className="indigo-text">Login</h5>
          <div className="container">
            <div className="row panel" style={{ display: 'inline-block' }}>
              <form className="col s12" method="post" onSubmit={this.login.bind(this)}>
                <RadioUser idEmail="idEmailLogin" idTelefone="idTelefoneLogin" handleInputChange={this.handleInputChange.bind(this)} />
                <div className='row'>
                  <div className='input-field col s12'>
                    <input ref="senha" id="senha" type='password' name='userLogin.usuario.senha' value={this.state.userLogin.usuario.senha} placeholder="Senha" required onChange={this.handleInputChange.bind(this)} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col s7 left-align'>
                    <input type="checkbox" id="manterConectado" ref={(input) => this.keepAlive = input} />
                    <label htmlFor="manterConectado">Manter conectado</label>
                  </div>
                  <label className='col s5 right-align' style={{ marginTop: '3px' }}>
                    <a href="#" onClick={this.showModal.bind(this)} className="pink-text" >Esqueceu a senha?</a>
                  </label>
                  <div className='col s12' />
                </div>
                <br />
                <center>
                  <div className='row'>
                    <button ref="loginBtn" type='submit' className='col s12 btn btn-large INFO'>Login</button>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </center>
        <ModalRenewPassword showModal={this.state.showModal} callbackHideModal={this.hideModal.bind(this)} />
      </main>

    );

  }
}

 
const mapDispatchToProps = dispatch => {
  return {
    showLoading:() => {
      dispatch(showLoading());
    },
    hideLoading:() => {
      dispatch(hideLoading());
    },
    login:(login) => {
      dispatch(UserService.dispatchLogin(login));
    }
  }
} 

const LoginContainer = connect(null,mapDispatchToProps)(Login);

export default LoginContainer;



