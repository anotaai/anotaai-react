import React, { Component } from 'react';
import vendedor from "../../../img/vendedor.png"
import comprador from "../../../img/comprador.png"
import { URL } from '../../../helpers/constants'
import T from 'i18n-react';
import { push } from '../../App'
import { CSSTransitionGroup } from 'react-transition-group'

export default class Register extends Component {



  render() {

    return (
      <CSSTransitionGroup
        transitionName="anotaai"
        transitionAppear={true}
        transitionAppearTimeout={500}>
        <div className="container">
          <div className="section" />
          <div className="section" />
          <div className="row">
            <div className="offset-s1 col s10 m6 l6 center-align">
              <img id="vendedor" src={vendedor} href="#" style={{ cursor: 'pointer' }} alt="Cadastrar Vendedor" title="Cadastrar Vendedor" onClick={push.bind(this, URL.VENDEDOR)} className="circle responsive-img indigo lighten-4" />
              <h5 className="indigo-text"><T.span text={{ key: "label.vendedor" }} /></h5>
            </div>
            <div className="offset-s1 col s10 m6 l6 center-align">
              <img id="comprador" src={comprador} href="#" style={{ cursor: 'pointer' }} alt="Cadastrar Comprador" title="Cadastrar Comprador" onClick={push.bind(this, URL.COMPRADOR)} className="circle responsive-img indigo lighten-4" />
              <h5 className="indigo-text"><T.span text={{ key: "label.comprador" }} /></h5>
            </div>
          </div>
          <div className="section" />
          <div className="section" />
        </div>
      </CSSTransitionGroup>
    );

  }
}