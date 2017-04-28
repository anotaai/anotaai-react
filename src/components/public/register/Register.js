import React, { Component } from 'react';
import vendedor from "../../../img/vendedor.png"
import comprador from "../../../img/comprador.png"
import {browserHistory} from 'react-router'
import {urlVendedor,urlComprador} from '../../../helpers/constants'


export default class Registrar extends Component {

  redireciona(login) {
    browserHistory.push(login);
  }

  componentDidMount() {
     window.Materialize.fadeInImage('#vendedor');
     window.Materialize.fadeInImage('#comprador');
  }

  render() {

    return (
      <div className="container">
         <div className="section" />
         <div className="section" />
          <div className="row">
           <div className="offset-s1 col s5 center-align">
               <img id="vendedor" src={vendedor} href="#" style={{cursor: 'pointer'}} alt="Cadastrar Vendedor" title="Cadastrar Vendedor" onClick={this.redireciona.bind(this,urlVendedor)} className="circle responsive-img indigo lighten-4" />  
               <h5 className="indigo-text">Vendedor</h5>
            </div>
            <div className="col s5 center-align">
               <img id="comprador" src={comprador} href="#"  style={{cursor: 'pointer'}}   alt="Cadastrar Comprador" title="Cadastrar Comprador" onClick={this.redireciona.bind(this,urlComprador)}   className="circle responsive-img indigo lighten-4" />  
               <h5 className="indigo-text">Comprador</h5>
            </div>
           </div>
          </div>
    );

  }
}