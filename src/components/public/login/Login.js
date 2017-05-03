import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'
import ModalRenewPassword from './ModalRenewPassword'
import UsuarioService from '../../../services/UserService'
import { getObjectNewState , createInstance } from '../../../helpers/jsonHelper'
import { TYPE_MESSAGE_ERROR }  from '../../../helpers/constants'
import ShowMessage  from '../../../helpers/ShowMessage'

export class RadioUser extends Component {

  constructor() {
    super();
    this.state = { tipoContato: 'telefone' };
  }

  changeRadio(e) {
    this.setState({ tipoContato: e.target.value })
  }

  handleInputChange(e) {
    this.props.handleInputChange(e);
  }

  render() {
    let field = null;

    if (this.state.tipoContato === 'telefone') {
      field = <MaskedInput id='telefone'   onChange={this.handleInputChange.bind(this)} mask="(11) 11111-1111"   name="userLogin.usuario.telefone" required placeholder="Telefone" />
    } else {
      field = <div> 
               <input id="email" className='validate' type='email' onChange={this.handleInputChange.bind(this)}   name="userLogin.usuario.email" required placeholder="Email" /> 
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
    this.state = { showModal: false  , userLogin:{usuario: {email:'',telefone:'',senha:''}, tipoAcesso: ''}};
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
    this.context.store.dispatch(UsuarioService.login(this.state.userLogin,this.keepAlive.checked));
  }

   componentDidMount(){
      this.context.store.subscribe(() => {
        const errorMsg =  this.context.store.getState().auth.errorMsg;
        if(errorMsg !== '') {
           ShowMessage.show(errorMsg,TYPE_MESSAGE_ERROR);
           const newState = createInstance(this.state);
           newState.userLogin.usuario.senha = '';
           this.setState(newState);
        }
      })
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
                <RadioUser idEmail="idEmailLogin" idTelefone="idTelefoneLogin"   handleInputChange={this.handleInputChange.bind(this)} />
                <div className='row'>
                  <div className='input-field col s12'>
                    <input id="senha"  type='password' name='userLogin.usuario.senha' value={this.state.userLogin.usuario.senha}  placeholder="Senha"   required onChange={this.handleInputChange.bind(this)} />
                  </div>
                </div>
                <div className='row'> 
                  <div className='col s7 left-align'>  
                     <input type="checkbox" id="manterConectado" ref={(input) => this.keepAlive = input} />
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