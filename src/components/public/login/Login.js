import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'
import ModalRenewPassword from './ModalRenewPassword'
import UserService from '../../../services/UserService'
import { getObjectNewState } from '../../../helpers/jsonHelper'
import Toast from '../../../helpers/Toast'
import { TipoMensagem } from '../../../domain/TipoMensagem'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { connect } from 'react-redux'


export class RadioUser extends Component {

  constructor() {
    super();
    this.state = { tipoContato: 'telefone' };
    var info = TipoMensagem.INFO;
    console.log(TipoMensagem.valueOf('INFO'));
    console.log(info);
  }

  changeRadio(e) {
    this.setState({ tipoContato: e.target.value })
  }


  render() {
    let field = null;

    if (this.state.tipoContato === 'telefone') {
      field = <MaskedInput id='telefone' onChange={this.props.handleInputChange.bind(this)} mask="(11) 11111-1111" name="userLogin.usuario.telefone" required placeholder="Telefone" />
    } else {
      field = <div>
        <input id="email" className='validate' type='email' onChange={this.props.handleInputChange.bind(this)} name="userLogin.usuario.email" required placeholder="Email" />
        <label htmlFor="email" data-error="Email inválido" />
      </div>
    }

    return (
      <div>
        <div className="row">
          <input type="radio" id={this.props.idTelefone} name="radioContato" value="telefone" defaultChecked onChange={this.changeRadio.bind(this)} />
          <label htmlFor={this.props.idTelefone} style={{ paddingRight: '20px' }}>Telefone</label>
          <input type="radio" id={this.props.idEmail} name="radioContato" value="email" onChange={this.changeRadio.bind(this)} />
          <label htmlFor={this.props.idEmail}>Email</label>
        </div>
        <div className='row'>
          <div className='input-field col s12'>
            {field}
          </div>
        </div>
      </div>
    );
  }
}


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
      }
    }).catch(error => {
      Toast.defaultError();
    }).then(() => {
      if (this.refs.loginBtn !== undefined) {
        this.refs.loginBtn.removeAttribute("disabled");
      }
      this.props.hideLoading();
    });
  }

  render() {

    return (
      <main className="space-container"> 
        <center>
          <h5 className="indigo-text">Login</h5>

          <div className="container">
            <div className="row panel" style={{ display: 'inline-block' }}>
              <form className="col s12" method="post" onSubmit={this.login.bind(this)}>
                <RadioUser idEmail="idEmailLogin" idTelefone="idTelefoneLogin" handleInputChange={this.handleInputChange.bind(this)} />
                <div className='row'>
                  <div className='input-field col s12'>
                    <input id="senha" type='password' name='userLogin.usuario.senha' value={this.state.userLogin.usuario.senha} placeholder="Senha" required onChange={this.handleInputChange.bind(this)} />
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



