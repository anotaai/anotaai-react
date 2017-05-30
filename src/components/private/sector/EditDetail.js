import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import Base64Service from '../../../services/app/Base64Service'
import { getObjectNewState } from '../../../helpers/jsonHelper'
import SectorService from '../../../services/sector/SectorService'
import Toast from '../../../helpers/Toast'
import Detail, { stateJsonDetail } from './Detail'
import { push } from '../../App'
import { URL } from '../../../helpers/constants'

class EditDetail extends Component {

    constructor(props) {
        super(props);
        this.sendButton = null;
        this.activeClass = 'S';
        this.state = stateJsonDetail();

    }

    componentDidMount() {

        this.props.showLoading();
        const id = Base64Service.decode(this.props.params.id);
        SectorService.findById(id).then(response => {
            if (response.isValid)
                this.setState(response.entity);
            else
                Toast.show(response.messages);
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
            this.props.hideLoading();
        });
    }

    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    update(e) {
        e.preventDefault();
        this.props.showLoading();
        this.sendButton.setAttribute("disabled", "disabled");

        SectorService.update(this.state).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
            if (this.sendButton) {
                this.sendButton.removeAttribute("disabled");
            }
            this.props.hideLoading();
        });

    }

    render() {


        const customButtons =
            <span>
                <button className="btn waves-effect buttons-space INFO" onClick={push.bind(this, URL.GROUP_PRODUCT)}>
                    Grupo Produto <i className="material-icons right">apps</i>
                </button>
                <button className="btn waves-effect buttons-space ERROR">
                    Deletar <i className="material-icons right">delete</i>
                </button>
            </span>

        const customResponsiveButtons =    
            <span>
                <li>
                    <div className="row">
                        <div className="col col s2 offset-s8">
                            <span className="new badge badge-responsive-align  INFO">Grupo Produto</span>
                        </div>
                        <div className="col col s2">
                            <button className="btn-floating INFO" formNoValidate onClick={push.bind(this, URL.GROUP_PRODUCT)}><i className="material-icons">apps</i></button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="row">
                        <div className="col col s2 offset-s8">
                            <span className="new badge badge-responsive-align  ERROR">Deletar</span>
                        </div>
                        <div className="col col s2">
                            <button className="btn-floating ERROR" formNoValidate><i className="material-icons">delete</i></button>
                        </div>
                    </div>
                </li>
            </span>


        return (
            <Detail {...this.state} customResponsiveButtons={customResponsiveButtons} customButtons={customButtons} activeClass={this.activeClass} merge={this.update.bind(this)} handleInputChange={this.handleInputChange.bind(this)} submitRef={el => this.sendButton = el} />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoading: () => {
            dispatch(showLoading());
        },
        hideLoading: () => {
            dispatch(hideLoading());
        }
    }
}



const EditSectorContainer = connect(null, mapDispatchToProps)(EditDetail);

export default EditSectorContainer;