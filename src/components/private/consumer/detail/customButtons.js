import React from 'react'

export function CustomButtons(props) {
    return (
        <span>
            {props.isRecommendEdition &&
                <button ref={props.submitRef} onClick={props.recommendEdition} className="btn waves-effect buttons-space INFO" formNoValidate>
                    Recomendar Edição <i className="material-icons right">mail</i>
                </button>}
            <button className="btn waves-effect buttons-space ERROR" onClick={props.remove}>
                Deletar <i className="material-icons right">delete</i>
            </button>
        </span>)
}

export function CustomResponsiveButtons(props) {

    return (
        <span>
            {props.isRecommendEdition &&
                <li>
                    <div className="row">
                        <div className="col col s2 offset-s8">
                            <span className="new badge badge-responsive-align INFO">Recomendar Edição</span>
                        </div>
                        <div className="col col s2">
                            <button className="btn-floating INFO" onClick={props.recommendEdition} formNoValidate><i className="material-icons">mail</i></button>
                        </div>
                    </div>
                </li>}
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