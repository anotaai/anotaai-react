import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USE_CASE, URL } from '../../../../helpers/constants'
import Detail from './Detail'
import ClienteConsumidorService from '../../../../services/consumer/ClienteConsumidorService'
import Base64Service from '../../../../services/app/Base64Service'
import { clearForm, handleInputChange, updateConsumer } from '../../../../actions/userActionCreator'
import { CustomButtons, CustomResponsiveButtons } from '../../templatedetail/customButtons'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'

class EditDetail extends Component {

  constructor(props) {
    super(props);
    this.sendButton = null;
    this.id = null;
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  componentDidMount() {
    this.id = Base64Service.decode(this.props.params.id);
    this.props.findById(this.id);
  }

  update(e) {

    e.preventDefault();

    this.sendButton.setAttribute("disabled", "disabled");

    const clienteConsumidor = ClienteConsumidorService.buildConsumer(this.id,this.props.detailState.userLogin.usuario);

    ClienteConsumidorService.update(clienteConsumidor).then(response => {
      Toast.show(response.messages);
    }).catch(error => {
      Toast.defaultError();
    }).then(() => {
      this.sendButton.removeAttribute("disabled");
    });
  }

  remove(e) {
        e.preventDefault();

        if (confirm('Confirma a exclusão do consumidor?')) {

            ClienteConsumidorService.remove(this.id).then(response => {
                Toast.show(response.messages);
                if (response.isValid) {
                    browserHistory.push(URL.CONSUMER);
                }
            }).catch(error => {
                Toast.defaultError();
            });
        }
    }

  render() {
    return (

      <Detail
        title="Edição de Consumidor"
        {...this.props.detailState}
        merge={this.update.bind(this)}
        handleInputChange={this.props.handleInputChange}
        editMode="S"
        customResponsiveButtons={<CustomResponsiveButtons remove={this.remove.bind(this)} />}
        customButtons={<CustomButtons remove={this.remove.bind(this)} />} 
        submitRef={el => this.sendButton = el}
      />
    );
  }
}


const mapStateToProps = state => {
  return { detailState: state.consumer }
}

const matDispatchToProps = dispatch => {
  return {
    handleInputChange: (e) => {
      dispatch(handleInputChange(USE_CASE.CONSUMER, e.target.name, e.target.value));
    },
    clearForm: () => {
      dispatch(clearForm(USE_CASE.CONSUMER));
    },
    findById: (id) => {
      dispatch(ClienteConsumidorService.findById(id, updateConsumer,USE_CASE.CONSUMER));
    }
  }
}

const EditConsumerDetailContainer = connect(mapStateToProps, matDispatchToProps)(EditDetail);

export default EditConsumerDetailContainer;

