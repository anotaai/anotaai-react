import React from 'react'
import { push } from './App'

export function PanelFooter(props) {

    return (
        <div className={props.isPublic ? 'space-container' : ''}>
            <div className={props.isPublic ? 'container' : ''}>
                <div className={props.isPublic ? 'row' : ''}>
                    <div className="panel-footer">

                        {props.isPublic &&
                            <button className="btn waves-effect DEFAULT" formNoValidate onClick={props.clearForm.bind(this)}>
                                Limpar
                            </button>
                        }

                        {!props.isPublic &&
                            <button className="btn waves-effect INFO" formNoValidate onClick={push.bind(this, props.newDetailUrl)}>
                                Novo <i className="material-icons right">assignment</i>
                            </button>
                        }

                        <button ref={props.submitRef} className="btn waves-effect buttons-space SUCCESS"  type="submit" name="action">{props.label}
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export function PanelFooterDetail(props) {

    return (

        <div className="panel-footer-detail" >

             {props.customButtons}

            <button className="btn waves-effect DEFAULT" formNoValidate onClick={props.clearForm.bind(this)}>
                Limpar
            </button>

            <button className="btn waves-effect buttons-space WARNING"  formNoValidate  onClick={push.bind(this, props.searchUrl)}>
                Pesquisar  
            </button>

            <button ref={props.submitRef} className="btn waves-effect buttons-space SUCCESS"  type="submit" name="action"> 
                Gravar <i className="material-icons right">send</i>
            </button>
           
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



