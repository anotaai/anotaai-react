import React, { Component } from 'react'
import ModalRenewPasswordContainer from './ModalRenewPassword'
import UserService from '../../../services/UserService'
import { USE_CASE } from '../../../helpers/constants'
import { handleInputChange, clearForm, clearPassword, showModal, hideModal, changeRadio } from '../../../actions/userActionCreator'
import Toast from '../../../helpers/Toast'
import { connect } from 'react-redux'
import RadioUser from './RadioUser'

class Login extends Component {

  componentWillUnmount() {
    this.props.clearForm();
  }

  showModal(e) {
    e.preventDefault();
    this.props.showModal();
  }

  hideModal() {
    this.props.hideModal();
  }

  login(e) {
    e.preventDefault();

    UserService.login(this.props.loginState.userLogin, this.keepAlive.checked, this.refs.loginBtn).then(response => {
      if (response.isValid) {
        this.props.login(response.login);
      } else {
        Toast.show(response.messages);
        this.clearPassword();
      }
    }).catch((error) => {
      Toast.defaultError();
    }).then(() => {
      if (this.refs.loginBtn !== undefined) {
        this.clearPassword();
      }
    });
  }

  clearPassword() {
    this.refs.senha.focus();
    this.props.clearPassword();
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
                <RadioUser idEmail="idEmailLogin" idTelefone="idTelefoneLogin" userLogin={this.props.loginState.userLogin} changeRadio={this.props.changeRadio} handleInputChange={this.props.handleInputChange} />
                <div className='row'>
                  <div className='input-field col s12'>
                    <input ref="senha" id="senha" type='password' name='userLogin.usuario.senha' value={this.props.loginState.userLogin.usuario.senha} placeholder="Senha" required onChange={this.props.handleInputChange} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col s7 left-align'>
                    <input type="checkbox" id="manterConectado" ref={(input) => this.keepAlive = input} />
                    <label htmlFor="manterConectado">Manter conectado</label>
                  </div>
                  <label className='col s5 right-align' style={{ marginTop: '3px' }}>
                    <a onClick={this.showModal.bind(this)} className="pink-text clickable" >Esqueceu a senha?</a>
                  </label>
                  <div className='col s12' />
                </div>
                <br />
                <center>
                  <div className='row'>
                    <button ref="loginBtn" type='submit' className='col s12 btn btn-large waves-effect INFO'>Login</button>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </center>
        <ModalRenewPasswordContainer showModal={this.props.loginState.showModal} callbackHideModal={this.hideModal.bind(this)} />
      </main>

    );

  }
}


const mapStateToProps = state => {
  return { loginState: state.login }
}

const mapDispatchToProps = dispatch => {
  return {
    handleInputChange: (e) => {
      dispatch(handleInputChange(USE_CASE.LOGIN, e.target.name, e.target.value));
    },
    clearForm: () => {
      dispatch(clearForm(USE_CASE.LOGIN));
    },
    clearPassword: () => {
      dispatch(clearPassword(USE_CASE.LOGIN));
    },
    showModal: () => {
      dispatch(clearForm(USE_CASE.LOGIN));
      dispatch(showModal(USE_CASE.LOGIN));
    },
    hideModal: () => {
      dispatch(clearForm(USE_CASE.LOGIN));
      dispatch(hideModal(USE_CASE.LOGIN));
    },
    login: (login) => {
      dispatch(UserService.dispatchLogin(login));
    },
    changeRadio: (e) => {
      dispatch(changeRadio(USE_CASE.LOGIN, e.target.value));
    }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;