import React, { Component } from 'react'
import {Link} from 'react-router'

export default class Login extends Component {

  constructor(props) {
    super(props);
  }

  teste(e) {
    e.preventDefault();
    window.Materialize.toast('I am a toast!', 4000);
  }

  render() {

    return (

      <main>
        <center>
          <div className="section"></div>

          <h5 className="indigo-text">Login</h5>
          <div className="section"></div>

          <div className="container">
            <div className="z-depth-1 grey lighten-4 row" style={{display: 'inline-block' , padding: '32px 48px 0px 48px' , border: '1px solid #EEE'}}>

              <form className="col s12" method="post">
                <div className='row'>
                  <div className='col s12'>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='email' name='email' id='email' />
                    <label htmlFor='email'>Email</label>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='password' name='password' id='password' />
                    <label htmlFor='password'>Senha</label>
                  </div>
                  <label style={{float: 'right'}}>
                     <Link to="/#" className="pink-text"><strong>Esqueci a senha</strong></Link>
                  </label>
                </div>

                <br />
                <center>
                  <div className='row'>
                    <button type='submit' onClick={this.teste.bind(this)} name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                  </div>
                </center>
              </form>
            </div>
          </div>
          <Link to="/cadastro">Cadastro</Link>
        </center>
        <div className="section"></div>
        <div className="section"></div>
      </main>

    );

  }
}