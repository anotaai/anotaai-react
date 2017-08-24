import React from 'react'

export function CustomButtons(props) {
    return (
     <span>
        <button onClick={props.showModalCommodity} className="btn waves-effect buttons-space INFO" type="button">
            Entrar com Mercadoria <i className="material-icons right">list</i>
        </button>
     </span>
    )
}


export function CustomResponsiveButtons(props) {

    return (
        <li>
            <div className="row">
                <div className="col s2 offset-s8">
                    <span className="new badge badge-responsive-align INFO">EntrarComMercadoria</span>
                </div>
                <div className="col col s2">
                    <button className="btn-floating INFO" onClick={props.showModalCommodity} type="button"><i className="material-icons">list</i></button>
                </div>
            </div>
        </li> 
    )
}