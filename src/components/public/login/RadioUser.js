import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'

export default class RadioUser extends Component {

  
  render() {
    let field = null;
    
    if (this.props.userLogin.tipoAcesso === 'TELEFONE') {
      field = <MaskedInput id='telefone' value={this.props.userLogin.usuario.telefone} onChange={this.props.handleInputChange.bind(this)} mask="(11) 11111-1111" name="userLogin.usuario.telefone" required placeholder="Telefone" />
    } else {
      field = <div>
        <input id="email" className='validate' value={this.props.userLogin.usuario.email} type='email' onChange={this.props.handleInputChange.bind(this)} name="userLogin.usuario.email" required placeholder="Email" />
        <label htmlFor="email" data-error="Email inválido" />
      </div>
    }

    return (
      <div>
        <div className="row">
          <input type="radio" id={this.props.idTelefone} name="radioContato" value="TELEFONE" checked={this.props.userLogin.tipoAcesso === 'TELEFONE'} onChange={this.props.changeRadio.bind(this)} />
          <label htmlFor={this.props.idTelefone} style={{ paddingRight: '20px' }}>Telefone</label>
          <input type="radio" id={this.props.idEmail} name="radioContato" value="EMAIL"  checked={this.props.userLogin.tipoAcesso === 'EMAIL'}  onChange={this.props.changeRadio.bind(this)} />
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