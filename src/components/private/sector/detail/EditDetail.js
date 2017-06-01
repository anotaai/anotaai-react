import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import Base64Service from '../../../../services/app/Base64Service'
import { getObjectNewState } from '../../../../helpers/jsonHelper'
import SectorService from '../../../../services/sector/SectorService'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'
import Detail, { stateJsonDetail } from './Detail'
import { CustomButtons, CustomResponsiveButtons } from './customButtons'
import { URL } from '../../../../helpers/constants'


class EditDetail extends Component {

    constructor(props) {
        super(props);
        this.sendButton = null;
        this.activeClass = 'S';
        this.state = stateJsonDetail();
    }

    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
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

    remove(e) {
        e.preventDefault();

        if (confirm('Confirma a exclusão do setor?')) {

            this.props.showLoading();
            SectorService.remove(this.state.id).then(response => {
                if (response.isValid) {
                    Toast.show(response.messages);
                    browserHistory.push(URL.SECTOR);
                }
            }).catch(error => {
                Toast.defaultError();
            }).then(() => {
                this.props.hideLoading();
            });
        }
    }

    render() {
        return (
            <Detail {...this.state}
                title="Edição de Setores"
                customResponsiveButtons={<CustomResponsiveButtons remove={this.remove.bind(this)} />}
                customButtons={<CustomButtons remove={this.remove.bind(this)} />}
                activeClass={this.activeClass} merge={this.update.bind(this)}
                handleInputChange={this.handleInputChange.bind(this)}
                submitRef={el => this.sendButton = el} />
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