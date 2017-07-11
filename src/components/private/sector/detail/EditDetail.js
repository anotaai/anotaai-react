import React, { Component } from 'react'
import { connect } from 'react-redux'
import Base64Service from '../../../../services/app/Base64Service'
import SectorService from '../../../../services/sector/SectorService'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'
import Detail from './Detail'
import { CustomButtons, CustomResponsiveButtons } from './customButtons'
import { URL } from '../../../../helpers/constants'
import { clearForm, handleInputChange, updateState, showModal, hideModal } from '../../../../actions/sectorActionCreator'


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
    
        SectorService.update(this.props.detailState, this.sendButton).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            Toast.defaultError();
        });
    }

    remove() {
        
        SectorService.remove(this.props.detailState.id).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.SECTOR);
            }
        }).catch(error => {
            Toast.defaultError();
        });

    }

    render() {
        return (
            <Detail {... this.props.detailState}
                title="Edição de Setores"
                customResponsiveButtons={<CustomResponsiveButtons remove={this.remove.bind(this)} />}
                customButtons={<CustomButtons remove={this.remove.bind(this)} />}
                editMode="S" merge={this.update.bind(this)}
                handleInputChange={this.props.handleInputChange}
                showModal={this.props.showModal}
                hideModal={this.props.hideModal}
                showModalState={this.props.detailState.showModalState}
                remove={this.remove.bind(this)}
                submitRef={el => this.sendButton = el} />
        );
    }
}

const mapStateToProps = state => {
    return { detailState: state.detailSector }
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
            dispatch(SectorService.findById(id, updateState));
        },
        showModal: () => {
            dispatch(showModal());
        },
        hideModal: () => {
            dispatch(hideModal());
        },
    }
}

const EditSectorContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);

export default EditSectorContainer;