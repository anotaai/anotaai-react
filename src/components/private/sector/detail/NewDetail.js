import React, { Component } from 'react'
import { connect } from 'react-redux'
import { URL } from '../../../../helpers/constants'
import { browserHistory } from 'react-router'
import SectorService from '../../../../services/sector/SectorService'
import Base64Service from '../../../../services/app/Base64Service'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import { clearForm , handleInputChange } from '../../../../actions/sectorActionCreator'

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
    
        this.sendButton.setAttribute("disabled", "disabled");

        SectorService.save(this.props.detailState).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                const id = Base64Service.encode(response.entity.id.toString());
                browserHistory.push(`${URL.SECTOR}/${id}`);
            }
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
             if(this.sendButton != null)
              this.sendButton.removeAttribute("disabled");
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
            dispatch(handleInputChange(e.target.name,e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm());
        }
    }
}

const NewSectorContainer = connect(mapStateToProps,mapDispatchToProps)(NewDetail);

export default NewSectorContainer;