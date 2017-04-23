import React, { Component } from 'react'
import { Link } from 'react-router'
import MaskedInput from 'react-maskedinput'
import ModalRenovarSenha from './ModalRenovarSenha'
import { urlRegistrar} from '../../../helpers/constants'
 


export class RadioUsuario extends Component {

  constructor() {
    super();
    this.state = { tipoContato: 'telefone' };
  }

  changeRadio(e) {
    this.setState({ tipoContato: e.target.value })
  }

  changeEmail(e) {
    this.props.callbackEmail(e.target.value);
  }

  changeTelefone(e) {
    this.props.callbackTelefone(e.target.value);
  }

  render() {
    let field = null;

    if (this.state.tipoContato === 'telefone') {
      field = <MaskedInput id='telefone'   onChange={this.changeTelefone.bind(this)} mask="(11) 11111-1111" required placeholder="Telefone" />
    } else {
      field = 
      <div> 
         <input id="email" className='validate' type='email' onChange={this.changeEmail.bind(this)}  required placeholder="Email" /> 
         <label for="email" data-error="Email inválido" />
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


export default class Login extends Component {

  constructor() {
    super();
    this.state = { showModal: false };
  }

  showModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  changeEmail(email) {
    this.email = email;

  }

  changeTelefone(telefone) {
    this.telefone = telefone;
  }

  login(e) {
    e.preventDefault();
    console.log(this.telefone);
    console.log(this.email);
    console.log(this.senha.value);
    
  }
  render() {

    return (
      <main>
        <center>
          <div className="section"></div>
          <h5 className="indigo-text">Login</h5>
         
          <div className="container">
            <div className="z-depth-1 row panel">
              <form className="col s12" method="post" onSubmit={this.login.bind(this)}>
                <RadioUsuario idEmail="idEmailLogin" idTelefone="idTelefoneLogin"  callbackEmail={this.changeEmail.bind(this)} callbackTelefone={this.changeTelefone.bind(this)} />
                <div className='row'>
                  <div className='input-field col s12'>
                    <input id="senha"  type='password' name='password'  placeholder="Senha" required ref={(input) => this.senha = input} />
                  </div>
                </div>
                <div className='row'> 
                  <div className='col s7 left-align'>  
                     <input type="checkbox" id="manterConectado" ref={(input) => this.materConectado = input} />
                     <label  htmlFor="manterConectado">Manter conectado</label>
                  </div>
                  <label className='col s5 right-align' style={{marginTop:'3px'}}>
                    <a href="#" onClick={this.showModal.bind(this)} className="pink-text" >Esqueceu a senha?</a>
                  </label>
                  <div className='col s12' />  
                </div>
                <br/>
                <center>
                  <div className='row'>
                    <button type='submit' className='col s12 btn btn-large info'>Login</button>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </center> 
        <div className="section"></div>
        <div className="section"></div>
        <ModalRenovarSenha showModal={this.state.showModal} callbackHideModal={this.hideModal.bind(this)} />
      </main>

    );

  }
}