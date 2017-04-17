import React, { Component } from 'react'
import {Link} from 'react-router'

export default class Header extends Component {


    render() {
        return (

            <header className="mdc-toolbar mdc-toolbar--fixed">
                <div className="mdc-toolbar__row">
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                        <span className="mdc-toolbar__title">Anotaai</span>
                    </section>
                </div>
            </header>);
    }
}