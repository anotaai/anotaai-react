import React, { Component } from 'react'
import { connect } from 'react-redux'
import { URL } from '../../../../helpers/constants'
import Detail from './Detail'
import ClienteConsumidorService from '../../../../services/consumer/ClienteConsumidorService'
import Base64Service from '../../../../services/app/Base64Service'
import { clearForm, handleInputChange, updateState, showModal, hideModal } from '../../../../actions/consumerActionCreator'
import { CustomButtons, CustomResponsiveButtons } from './customButtons'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'

class EditDetail extends Component {

  constructor(props) {
    super(props);
    this.sendButton = null;
    this.recommendButton = null;
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  componentDidMount() {
    this.props.findById(Base64Service.decode(this.props.params.id));
  }

  update(e) {

    e.preventDefault();

    const newInstance = ClienteConsumidorService.getPhone(this.props.detailState.clienteConsumidor);

    ClienteConsumidorService.update(newInstance,this.sendButton).then(response => {
      Toast.show(response.messages);
    }).catch(error => {
      Toast.defaultError();
    });

  }

  remove() {

      ClienteConsumidorService.remove(this.props.detailState.id).then(response => {
        Toast.show(response.messages);
        if (response.isValid) {
          browserHistory.push(URL.CONSUMER);
        }
      }).catch(error => {
        Toast.defaultError();
      });
  }

  recommendEdition(e) {
    
    e.preventDefault();

    const newInstance = ClienteConsumidorService.getPhone(this.props.detailState.clienteConsumidor);
    
    ClienteConsumidorService.recommendEdition(newInstance,this.recommendButton).then(response => {
      Toast.show(response.messages);
       if (response.isValid) {
          browserHistory.push(URL.CONSUMER);
       }
    }).catch(error => {
      Toast.defaultError();
    });
  }


  render() {
    return (
      <Detail
        title="Edição de Consumidor"
        {... this.props.detailState}
        merge={this.update.bind(this)}
        handleInputChange={this.props.handleInputChange}
        remove={this.remove.bind(this)}
        showModal={this.props.showModal} 
        hideModal={this.props.hideModal} 
        showModalState={this.props.detailState.showModalState} 
        customResponsiveButtons={<CustomResponsiveButtons isRecommendEdition={this.props.detailState.recommendEdition} recommendEdition={this.recommendEdition.bind(this)} />}
        customButtons={<CustomButtons  isRecommendEdition={this.props.detailState.recommendEdition} recommendEdition={this.recommendEdition.bind(this)} submitRef={el => this.recommendButton = el} />}
        submitRef={el => this.sendButton = el} />
    );
  }
}


const mapStateToProps = state => {
  return { detailState: state.detailConsumer }
}

const matDispatchToProps = dispatch => {
  return {
    handleInputChange: (e) => {
      dispatch(handleInputChange(e.target.name, e.target.value));
    },
    clearForm: () => {
      dispatch(clearForm());
    },
    findById: (id) => {
      dispatch(ClienteConsumidorService.findById(id, updateState));
    },
    showModal: () => {
       dispatch(showModal());
    },
    hideModal: () => {
       dispatch(hideModal());
    }
  }
}

const EditConsumerDetailContainer = connect(mapStateToProps, matDispatchToProps)(EditDetail);

export default EditConsumerDetailContainer;

