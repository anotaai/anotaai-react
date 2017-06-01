import React   from 'react'

export function CustomButtons(props) {
    return  ( 
      <span>
        <button className="btn waves-effect buttons-space ERROR"  onClick={props.remove}>
            Deletar <i className="material-icons right">delete</i>
        </button>
    </span>)
}

export function CustomResponsiveButtons(props) {
   
   return (
     <span>
        <li>
            <div className="row">
                <div className="col col s2 offset-s8">
                    <span className="new badge badge-responsive-align ERROR">Deletar</span>
                </div>
                <div className="col col s2">
                    <button className="btn-floating ERROR" onClick={props.remove}><i className="material-icons">delete</i></button>
                </div>
            </div>
        </li>
    </span>)
}