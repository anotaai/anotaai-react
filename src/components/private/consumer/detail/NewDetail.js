import React, {Component} from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'

class NewDetail extends Component {

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

const NewConsumerDetailContainer = connect(mapStateToProps,matDispatchToProps)(NewDetail);

export default NewConsumerDetailContainer;

