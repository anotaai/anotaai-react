import React, { Component } from 'react'
import {Link} from 'react-router'

export default class Header extends Component {


    render() {
        return (

            <header className="mdc-toolbar mdc-toolbar--fixed">
                <div className="mdc-toolbar__row">
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                       <Link to="/home"> <span className="mdc-toolbar__title">Anotaai</span></Link>
                    </section>
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
                       <Link to="/home" className="material-icons">file_download</Link>
                       <Link to="/home"  className="material-icons">print</Link>
                       <Link to="/home" className="material-icons">bookmark</Link>
                    </section>
                </div>
            </header>);
    }
}