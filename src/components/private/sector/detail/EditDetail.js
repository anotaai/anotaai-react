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
import { updateGroupProductBySector } from '../../../../actions/groupProductActionCreator'


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
            console.log('ERRO [components\\private\\sector\\detail\\EditDetail.js 36]');
        });
    }

    remove() {
        
        SectorService.remove(this.props.detailState.id).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.SECTOR);
            }
        }).catch(error => {
            console.log('ERRO [components\\private\\sector\\detail\\EditDetail.js 48]');
        });

    }

    sendSector() {
        browserHistory.push(URL.NEW_GROUP_PRODUCT);
        this.props.sendSector(this.props.detailState.id, this.props.detailState.nome);
    }
    
    render() {
        return (
            <Detail {... this.props.detailState}
                title="Edição de Setores"
                customResponsiveButtons={<CustomResponsiveButtons sendSector={this.sendSector.bind(this)}  />}
                customButtons={<CustomButtons sendSector={this.sendSector.bind(this)}  />}
                merge={this.update.bind(this)}
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
        sendSector: (id,nome) => {
            dispatch(updateGroupProductBySector(id,nome));
        }
    }
}

const EditSectorContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);

export default EditSectorContainer;