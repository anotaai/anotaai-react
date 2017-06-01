import React , { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading , hideLoading } from 'react-redux-loading-bar'

class NewDetail extends Component {

    render() {
        return (
            <div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
       showLoading: () => {
         dispatch(showLoading());
       },

       hideLoading: () => {
         dispatch(hideLoading());
       }
    }
}

const NewGroupProductDetailContainer = connect(null,mapDispatchToProps)(NewDetail);

export default NewGroupProductDetailContainer;