import React, {Component} from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'

class EditDetail extends Component {

  render() {
      return (
        <Detail />
      );
  }
}


const mapStateToProps = state => {
   return { detailState : state.consumerState  }
}

const matDispatchToProps = dispatch => {
    return {

    }
}

const EditConsumerDetailContainer = connect(mapStateToProps,matDispatchToProps)(EditDetail);

export default EditConsumerDetailContainer;

