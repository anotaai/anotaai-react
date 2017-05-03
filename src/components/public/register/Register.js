import React, { Component } from 'react';
import vendedor from "../../../img/vendedor.png"
import comprador from "../../../img/comprador.png"
import {browserHistory} from 'react-router'
import {URL_VENDEDOR,URL_COMPRADOR} from '../../../helpers/constants'
import T from 'i18n-react';

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
               <img id="vendedor" src={vendedor} href="#" style={{cursor: 'pointer'}} alt="Cadastrar Vendedor" title="Cadastrar Vendedor" onClick={this.redireciona.bind(this,URL_VENDEDOR)} className="circle responsive-img indigo lighten-4" />  
               <h5 className="indigo-text"><T.span text={{ key: "label.vendedor"}}/></h5>
            </div>
            <div className="col s5 center-align">
               <img id="comprador" src={comprador} href="#"  style={{cursor: 'pointer'}}   alt="Cadastrar Comprador" title="Cadastrar Comprador" onClick={this.redireciona.bind(this,URL_COMPRADOR)}   className="circle responsive-img indigo lighten-4" />  
               <h5 className="indigo-text"><T.span text={{ key: "label.comprador"}}/></h5>
            </div>
           </div>
          </div>
    );

  }
}