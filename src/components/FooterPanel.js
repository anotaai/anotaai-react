import React, { Component } from 'react'

export default class FooterPanel extends Component {

    render() {

        return (
            <div className={this.props.isPublic ? 'space-container' : ''}>
                <div className={this.props.isPublic ? 'container' : ''}>
                    <div className={this.props.isPublic ? 'row' : ''}>
                        <div className="panel-footer">
                            <button className="btn waves-effect DEFAULT" formNoValidate onClick={this.props.clearForm.bind(this)}>
                                Limpar
                            </button>
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