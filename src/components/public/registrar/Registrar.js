import React, { Component } from 'react';
import $ from 'jquery'
import vendedor from "../../../img/vendedor.png"
import comprador from "../../../img/comprador.png"
import {Link} from 'react-router'

export default class Registrar extends Component {

  render() {

    
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m9 l2">
            <div className="section"></div>
            <div className="section"></div>
            <div className="slider">
              <ul className="slides">
                <li>
                  <img src={vendedor} />
                  <div className="caption center-align">
                    <Link to="/login">Login</Link>
                  </div>
                </li>
                <li>
                  <img src={comprador} />
                  <div className="caption center-align">
                    <h3 className="indigo-text">Comprador</h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


    );

  }
}