import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'
import ModalRenewPassword from './ModalRenewPassword'
import LoginService from '../../../services/login/LoginService'

export class RadioUser extends Component {

  constructor() {
    super();
    this.state = { tipoContato: 'telefone' };
  }

  changeRadio(e) {
    this.setState({ tipoContato: e.target.value })
  }

  handleInputChange(e) {
    this.props.handleInputChange(e.target.value,e.target.name);
  }

  render() {
    let field = null;

    if (this.state.tipoContato === 'telefone') {
      field = <MaskedInput id='telefone'   onChange={this.handleInputChange.bind(this)} mask="(11) 11111-1111" name="telefone" required placeholder="Telefone" />
    } else {
      field = <div> 
               <input id="email" className='validate' type='email' onChange={this.handleInputChange.bind(this)}  name="email" required placeholder="Email" /> 
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


export default class Login extends Component {



  constructor() {
    super();
    this.state = { showModal: false , email:'',telefone:'' };
  }

  showModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  handleInputChange(value,name) {
      this.setState({[name]:value });
  }

  login(e) {
    e.preventDefault();
    console.log(this.state.telefone);
    console.log(this.state.email);
    console.log(this.senha.value);
    console.log(this.materConectado.checked);
    this.context.store.dispatch(LoginService.login());
  }

  
  render() {

    return (
      <main>
        <center>
          <div className="section"></div>
          <h5 className="indigo-text">Login</h5>
         
          <div className="container">
            <div className="z-depth-1 row panel" style={{ display:'inline-block'}}>
              <form className="col s12" method="post" onSubmit={this.login.bind(this)}>
                <RadioUser idEmail="idEmailLogin" idTelefone="idTelefoneLogin"  handleInputChange={this.handleInputChange.bind(this)} />
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
        <ModalRenewPassword showModal={this.state.showModal} callbackHideModal={this.hideModal.bind(this)} />
      </main>

    );

  }
}

Login.contextTypes = {
  store : React.PropTypes.object.isRequired
}