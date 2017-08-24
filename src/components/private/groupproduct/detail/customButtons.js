import React   from 'react'

export function CustomButtons(props) {
    return  ( 
      <span>
        <button className="btn waves-effect buttons-space INFO" onClick={props.sendGroupProduct} type="button">
            Produto <i className="material-icons right">shopping_cart</i>
        </button>
    </span>)
}


export function CustomResponsiveButtons(props) {
   
   return (
     <span>
        <li>
            <div className="row">
                <div className="col col s2 offset-s8">
                    <span className="new badge badge-responsive-align INFO">Produto</span>
                </div>
                <div className="col col s2">
                    <button className="btn-floating INFO" type="button" onClick={props.sendGroupProduct}  ><i className="material-icons">shopping_cart</i></button>
                </div>
            </div>
        </li>
    </span>)
}