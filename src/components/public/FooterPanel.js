import React, { Component } from 'react'

export default class FooterPanel extends Component {

    render() {

        return (
           <div>
            <div className="container">
                <div className="z-depth-1 panel row">
                    <div className="col s12 panel-footer">
                        <button className="btn waves-effect default" formNoValidate onClick={this.props.clearForm.bind(this)}>
                            Limpar
                    </button>
                        <button className="btn waves-effect success" style={{ marginLeft: '5px' }} type="submit" name="action">Enviar
                        <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="section"></div>
            <div className="section"></div>
            <div className="section"></div>
           </div>
        );

    }
}