import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toast from '../../../../helpers/Toast'
import Detail from './Detail'
import Base64Service from '../../../../services/app/Base64Service'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import { CustomButtons, CustomResponsiveButtons } from '../../templatedetail/customButtons'
import { clearForm, handleInputChange, updateState } from '../../../../actions/groupProductActionCreator'
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
            <Detail {...this.props.detailState}
                title="Edição de Grupos de Produtos"
                merge={this.update.bind(this)}
                handleInputChange={this.props.handleInputChange}
                activeClass={this.activeClass}
                submitRef={el => this.sendButton = el}
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
        }
    }
}

const EditGroupProductDetailContainer = connect(mapStateToProps, mapDispatchToProps)(EditDetail);

export default EditGroupProductDetailContainer;