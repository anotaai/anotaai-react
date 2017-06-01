import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toast from '../../../../helpers/Toast'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import Detail, { stateJsonDetail } from './Detail'
import Base64Service from '../../../../services/app/Base64Service'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import { getObjectNewState } from '../../../../helpers/jsonHelper'
import { CustomButtons, CustomResponsiveButtons } from '../../templatedetail/customButtons'
import { browserHistory } from 'react-router'

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
        this.getEntity(this.props.params.id);
    }

    getEntity(idParam) {
        this.props.showLoading();
        const id = Base64Service.decode(idParam);
        GroupProductService.findById(id).then(response => {
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

        GroupProductService.update(this.state).then(response => {
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

        if (confirm('Confirma a exclusão do grupo de produto?')) {

            this.props.showLoading();
            GroupProductService.remove(this.state.id).then(response => {
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
                title="Edição de Grupos de Produtos"
                merge={this.update.bind(this)}
                handleInputChange={this.handleInputChange.bind(this)}
                activeClass={this.activeClass} 
                submitRef={el => this.sendButton = el} 
                customResponsiveButtons={<CustomResponsiveButtons remove={this.remove.bind(this)} />}
                customButtons={<CustomButtons remove={this.remove.bind(this)}  />} />
        )
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

const EditGroupProductDetailContainer = connect(null, mapDispatchToProps)(EditDetail);

export default EditGroupProductDetailContainer;