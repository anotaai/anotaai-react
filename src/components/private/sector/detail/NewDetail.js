import React, { Component } from 'react'
import { connect } from 'react-redux'
import { URL } from '../../../../helpers/constants'
import SectorService from '../../../../services/sector/SectorService'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import { clearForm, handleInputChange } from '../../../../actions/sectorActionCreator'
import { pushEncoded } from '../../../App'

class NewDetail extends Component {

    constructor() {
        
        super();
        this.sendButton = null;
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    save(e) {

        e.preventDefault();

        SectorService.save(this.props.detailState, this.sendButton).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
               pushEncoded(URL.SECTOR,response.entity.id);
            }
        }).catch(error => {
            Toast.defaultError();
        });
    }

    render() {
        return (
            <Detail {... this.props.detailState}
                title="Cadastro de Setores"
                merge={this.save.bind(this)}
                handleInputChange={this.props.handleInputChange}
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
        }
    }
}

const NewSectorContainer = connect(mapStateToProps, mapDispatchToProps)(NewDetail);

export default NewSectorContainer;