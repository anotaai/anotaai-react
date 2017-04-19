import React, { Component } from 'react'
import { Link } from 'react-router'
import { urlRegistrar } from '../../../helpers/constants'
import MaskedInput from 'react-maskedinput'
import ModalRenovarSenha from './ModalRenovarSenha'
 
 
export class RadioUsuario extends Component {

  constructor() {
    super();
  }

  changeRadio(e) {
    this.props.callbackTipoContato(e.target.value);
  }

  changeEmail(e) {
    this.props.callbackEmail(e.target.value);
  }

  changeTelefone(e) {
    this.props.callbackTelefone(e.target.value);
  }

  render() {

    const tipoContato = this.props.tipoContato;
    let field = null;

    if (tipoContato === 'telefone') {
      field = <MaskedInput id='telefone' className='validate' onChange={this.changeTelefone.bind(this)} mask="(11) 11111-1111" required placeholder="Telefone" />
    } else {
      field = <input className='validate' type='email' onChange={this.changeEmail.bind(this)} name='email' id='email' required placeholder="Email" />
    }

    return (
      <div>
        <div className="row">
          <input type="radio" name="contato" id="telefone" value="telefone" defaultChecked onChange={this.changeRadio.bind(this)} />
          <label htmlFor="telefone" style={{ paddingRight: '20px' }}>Telefone</label>
          <input type="radio" name="contato" id="email" value="email" onChange={this.changeRadio.bind(this)} />
          <label htmlFor="email">Email</label>
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
  this.state = { tipoContato: 'telefone' };
}

  changeEmail(email) {
    this.email = email;
   
  }

  changeTelefone(telefone) {
    this.telefone = telefone;
  }

   changeRadio(valor) {
      this.setState({ tipoContato: valor })
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
          <ModalRenovarSenha />
        <center>
          <div className="section"></div>
          <h5 className="indigo-text">Login</h5>
          <div className="section"></div>
          <div className="container">
            <div className="z-depth-1 grey lighten-4 row panel">
              <form className="col s12" method="post" onSubmit={this.login.bind(this)}>
                <RadioUsuario callbackTipoContato={this.changeRadio.bind(this)} tipoContato={this.state.tipContato} callbackEmail={this.changeEmail.bind(this)} callbackTelefone={this.changeTelefone.bind(this)} />
                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='password' name='password' id='password' placeholder="Senha" required ref={(input) => this.senha = input} />
                  </div>
                  <label style={{ float: 'right' }}>
                     <a href="/renew"  className="pink-text" > Esqueci a senha </a>
                  </label>
                </div>
                <br />
                <center>
                  <div className='row'>
                    <button type='submit' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                  </div>
                </center>
              </form>
            </div>
          </div>
          <Link to={urlRegistrar}>Registrar</Link>
        </center>
        <div className="section"></div>
        <div className="section"></div>
      
      </main>

    );

  }
}