import React, { Component } from 'react'
import { connect } from 'react-redux'
import Base64Service from '../../../../services/app/Base64Service'
import SectorService from '../../../../services/sector/SectorService'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'
import Detail from './Detail'
import { CustomButtons, CustomResponsiveButtons } from './customButtons'
import { URL } from '../../../../helpers/constants'
import { clearForm , handleInputChange, updateState } from '../../../../actions/sectorActionCreator'


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
      
        this.sendButton.setAttribute("disabled", "disabled");

        SectorService.update(this.props.detailState).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
            this.sendButton.removeAttribute("disabled");  
        });
    }

    remove(e) {
        e.preventDefault();

        if (confirm('Confirma a exclusão do setor?')) {

            SectorService.remove(this.props.detailState.id).then(response => {
                Toast.show(response.messages);
                if (response.isValid) {
                  browserHistory.push(URL.SECTOR);
                }
            }).catch(error => {
                Toast.defaultError();
            });
        }
    }

    render() {
        return (
            <Detail {...this.props.detailState}
                title="Edição de Setores"
                customResponsiveButtons={<CustomResponsiveButtons remove={this.remove.bind(this)} />}
                customButtons={<CustomButtons remove={this.remove.bind(this)} />}
                editMode="S" merge={this.update.bind(this)}
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
            dispatch(handleInputChange(e.target.name,e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        findById: (id) => {
            dispatch(SectorService.findById(id,updateState));
        }
    }
}

const EditSectorContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);

export default EditSectorContainer;