import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class FooterPanel extends Component {

    redirectNew(e) {
        e.preventDefault();
        browserHistory.push(this.props.newDetailUrl);
    } 
    
    render() {

        return (
            <div className={this.props.isPublic ? 'space-container' : ''}>
                <div className={this.props.isPublic ? 'container' : ''}>
                    <div className={this.props.isPublic ? 'row' : ''}>
                        <div className="panel-footer">
                            
                            {this.props.isPublic &&
                            <button className="btn waves-effect DEFAULT" formNoValidate onClick={this.props.clearForm.bind(this)}>
                                Limpar
                            </button>
                            }
                            
                            {!this.props.isPublic &&
                                <button className="btn waves-effect INFO" formNoValidate onClick={this.redirectNew.bind(this)}>
                                    Novo <i className="material-icons right">assignment</i>
                                </button>
                            }
    
                            <button ref={this.props.submitRef} className="btn waves-effect SUCCESS" style={{ marginLeft: '5px' }} type="submit" name="action">{this.props.label}
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}