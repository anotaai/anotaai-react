import React from 'react'
import { push } from './App'

export function PanelFooter(props) {

    return (
        <div className={props.isPublic ? 'space-container' : ''}>
            <div className={props.isPublic ? 'container' : ''}>
                <div className={props.isPublic ? 'row' : ''}>

                      {/* Botões normais */}

                    <div className="panel-footer hide-on-small-only">

                        {props.isPublic &&
                            <button type="button" className="btn waves-effect DEFAULT" formNoValidate onClick={props.clearForm.bind(this)}>
                                Limpar <i className="material-icons right">clear</i>
                            </button>
                        }

                        {!props.isPublic &&
                            <button type="button" className="btn waves-effect INFO" formNoValidate onClick={push.bind(this, props.newDetailUrl)}>
                                Novo <i className="material-icons right">assignment</i>
                            </button>
                        }

                        <button ref={props.submitRef} className="btn waves-effect buttons-space SUCCESS" name="action">{props.label}
                            <i className="material-icons right">send</i>
                        </button>
                    </div>

                      {/* Botões responsivos */}

                    <div className="panel-footer hide-on-med-and-up">
                        <div className="fixed-action-btn click-to-toggle">
                            <a className="btn-floating btn-large ERROR" title="Ações">
                                <i className="large material-icons">mode_edit</i>
                            </a>

                            <ul>
                                {props.isPublic &&
                                    <li>
                                        <div className="row">
                                            <div className="col col s2 offset-s8">
                                                <span className="new badge badge-responsive-align DEFAULT">Limpar</span> </div>
                                            <div className="col col s2">
                                                <button className="btn-floating DEFAULT" formNoValidate onClick={props.clearForm.bind(this)}><i className="material-icons">clear</i></button>
                                            </div>
                                        </div>
                                    </li>
                                }
                                {!props.isPublic &&
                                    <li>
                                        <div className="row">
                                            <div className="col col s2 offset-s8">
                                                <span className="new badge badge-responsive-align INFO">Novo</span> </div>
                                            <div className="col col s2">
                                                <button className="btn-floating INFO" formNoValidate onClick={push.bind(this, props.newDetailUrl)}><i className="material-icons">assignment</i></button>
                                            </div>
                                        </div>
                                    </li>
                                }
                                <li>
                                    <div className="row">
                                        <div className="col col s2 offset-s8">
                                            <span className="new badge badge-responsive-align SUCCESS">{props.label}</span> </div>
                                        <div className="col col s2">
                                            <button className="btn-floating SUCCESS"><i className="material-icons">send</i></button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export function PanelFooterDetail(props) {


    return (

        <div>
            {/* Botões normais */}

            <div className="panel-footer-detail hide-on-small-only">

                {props.customButtons}

                <button ref={props.submitRef} className="btn waves-effect buttons-space SUCCESS" type="submit" name="action">
                    Gravar <i className="material-icons right">send</i>
                </button>
            </div>

            {/* Botões responsivos */}

            <div className="panel-footer-detail-responsive hide-on-med-and-up">
                <div className="fixed-action-btn click-to-toggle">
                    <a className="btn-floating btn-large ERROR" title="Ações">
                        <i className="large material-icons">mode_edit</i>
                    </a>
                    <ul>
                        {props.customResponsiveButtons}

                        <li>
                            <div className="row">
                                <div className="col col s2 offset-s8">
                                    <span className="new badge badge-responsive-align SUCCESS">Gravar</span> </div>
                                <div className="col col s2">
                                    <button className="btn-floating SUCCESS"><i className="material-icons">send</i></button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}



export function PanelHeader(props) {
    return (
        <div className="panel-header">
            <span className="title-header"><i className="material-icons icon-panel">{props.icon}</i>{props.label}</span>
        </div>
    )
}