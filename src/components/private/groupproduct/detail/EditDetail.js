import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import Base64Service from '../../../../services/app/Base64Service'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import { clearForm, handleInputChange, updateState, updateSector, showModal, hideModal } from '../../../../actions/groupProductActionCreator'
import { browserHistory } from 'react-router'
import { URL } from '../../../../helpers/constants'

class EditDetail extends Component {

    constructor(props) {
        super(props);
        this.sendButton = null;
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    componentDidMount() {
        this.props.findById(Base64Service.decode(this.props.params.id));
    }

    update(e) {

        e.preventDefault();

        GroupProductService.update(this.props.detailState,this.sendButton).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            Toast.defaultError();
        });
    }


    remove() {

        GroupProductService.remove(this.props.detailState.id).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.GROUP_PRODUCT);
            }
        }).catch(error => {
            Toast.defaultError();
        });
    }


    render() {
        return (
            <Detail
                title="Edição de Grupos de Produtos"
                {... this.props.detailState}
                setores={this.props.detailState.setores}
                merge={this.update.bind(this)}
                handleInputChange={this.props.handleInputChange}
                editMode="S"
                submitRef={el => this.sendButton = el}
                getSector={this.props.getSector}
                setSector={this.props.setSector}
                showModal={this.props.showModal}
                hideModal={this.props.hideModal}
                showModalState={this.props.detailState.showModalState}
                remove={this.remove.bind(this)} />
        )
    }

}

const mapStateToProps = state => {
    return { detailState: state.detailGroupProduct }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        findById: (id) => {
            dispatch(GroupProductService.findById(id, updateState));
        },
        getSector: (name, value) => {
            new Promise((resolve) => {
                resolve(dispatch(handleInputChange(name, value)));
            }).then(() => {
                dispatch(GroupProductService.getSectors(value));
            });
        },
        setSector: (sector) => {
            dispatch(updateSector(sector));
        },
        showModal: () => {
            dispatch(showModal());
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}

const EditGroupProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);

export default EditGroupProductDetailContainer;