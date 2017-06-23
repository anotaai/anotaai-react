import React, { Component } from 'react'
import { connect } from 'react-redux'
import { URL } from '../../../../helpers/constants'
import Detail from './Detail'
import ClienteConsumidorService from '../../../../services/consumer/ClienteConsumidorService'
import Base64Service from '../../../../services/app/Base64Service'
import { clearForm, handleInputChange, updateState } from '../../../../actions/consumerActionCreator'
import { CustomButtons, CustomResponsiveButtons } from './customButtons'
import Toast from '../../../../helpers/Toast'
import { browserHistory } from 'react-router'

class EditDetail extends Component {

  constructor(props) {
    super(props);
    this.sendButton = null;
    this.recommendButton = null;
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

    const newInstance = ClienteConsumidorService.getPhone(this.props.detailState);

    ClienteConsumidorService.update(newInstance).then(response => {
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

  recommendEdition(e) {
    
    e.preventDefault();

    this.recommendButton.setAttribute("disabled", "disabled");

    const newInstance = ClienteConsumidorService.getPhone(this.props.detailState);
    
    ClienteConsumidorService.recommendEdition(newInstance).then(response => {
      Toast.show(response.messages);
       if (response.isValid) {
          browserHistory.push(URL.CONSUMER);
       }
    }).catch(error => {
      Toast.defaultError();
    }).then(() => {
      this.recommendButton.removeAttribute("disabled");
    });
  }


  render() {
    return (

      <Detail
        title="Edição de Consumidor"
        {...this.props.detailState}
        merge={this.update.bind(this)}
        handleInputChange={this.props.handleInputChange}
        editMode="S"
        customResponsiveButtons={<CustomResponsiveButtons remove={this.remove.bind(this)} isRecommendEdition={this.props.detailState.recommendEdition} recommendEdition={this.recommendEdition.bind(this)} />}
        customButtons={<CustomButtons remove={this.remove.bind(this)} isRecommendEdition={this.props.detailState.recommendEdition} recommendEdition={this.recommendEdition.bind(this)} submitRef={el => this.recommendButton = el} />}
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
    }
  }
}

const EditConsumerDetailContainer = connect(mapStateToProps, matDispatchToProps)(EditDetail);

export default EditConsumerDetailContainer;

