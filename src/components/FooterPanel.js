import React, { Component } from 'react'

export default class FooterPanel extends Component {

    render() {

        return (
           <div className="space-container">
            <div className="container">
                <div className="row">
                    <div className="col s12 panel-footer">
                        <button className="btn waves-effect DEFAULT" formNoValidate onClick={this.props.clearForm.bind(this)}>
                            Limpar
                        </button>
                        <button className="btn waves-effect SUCCESS" style={{ marginLeft: '5px' }} type="submit" name="action">{this.props.label}
                          <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
           </div>
        );

    }
}