import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'

export default class RadioUser extends Component {

  constructor() {
    super();
    this.state = { tipoContato: 'telefone' };
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