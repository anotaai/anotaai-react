import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import Base64Service from '../../../../services/app/Base64Service'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import { CustomButtons, CustomResponsiveButtons } from '../../templatedetail/customButtons'
import { clearForm, handleInputChange, updateState, updateSector } from '../../../../actions/groupProductActionCreator'
import { browserHistory } from 'react-router'

class EditDetail extends Component {

    constructor(props) {
        super(props);
        this.sendButton = null;
        this.activeClass = 'S';
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

        GroupProductService.update(this.props.detailState).then(response => {
            Toast.show(response.messages);
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
            this.sendButton.removeAttribute("disabled");
        });
    }


    remove(e) {
        e.preventDefault();

        if (confirm('Confirma a exclusão do grupo de produto?')) {

            GroupProductService.remove(this.props.detailState.id).then(response => {
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
            <Detail
                title="Edição de Grupos de Produtos"
                id={this.props.detailState.id}
                nome={this.props.detailState.nome}
                descricao={this.props.detailState.descricao}
                setor={this.props.detailState.setor}
                setores={this.props.detailState.setores}
                merge={this.update.bind(this)}
                handleInputChange={this.props.handleInputChange}
                activeClass={this.activeClass}
                submitRef={el => this.sendButton = el}
                getSector={this.props.getSector}
                setSector={this.props.setSector}
                customResponsiveButtons={<CustomResponsiveButtons remove={this.remove.bind(this)} />}
                customButtons={<CustomButtons remove={this.remove.bind(this)} />} />
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
        getSector: (name,value) => {
            new Promise((resolve) => {
                resolve(dispatch(handleInputChange(name,value)));
            }).then(() => {
                dispatch(GroupProductService.getSectors(value));
            }); 
           
        },
        setSector: (sector) => {
           dispatch(updateSector(sector));
        }
    }
}

const EditGroupProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);

export default EditGroupProductDetailContainer;