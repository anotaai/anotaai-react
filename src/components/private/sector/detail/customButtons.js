import React   from 'react'

export function CustomButtons(props) {
    return  ( 
      <span>
        <button className="btn waves-effect buttons-space INFO" onClick={props.sendSector} type="button">
            Grupo Produto <i className="material-icons right">apps</i>
        </button>
    </span>)
}


export function CustomResponsiveButtons(props) {
   
   return (
     <span>
        <li>
            <div className="row">
                <div className="col col s2 offset-s8">
                    <span className="new badge badge-responsive-align INFO">GrupoProduto</span>
                </div>
                <div className="col col s2">
                    <button className="btn-floating INFO" type="button" onClick={props.sendSector}  ><i className="material-icons">apps</i></button>
                </div>
            </div>
        </li>
    </span>)
}