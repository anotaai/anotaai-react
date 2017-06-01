import React , { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading , hideLoading } from 'react-redux-loading-bar'

class EditDetail extends Component {

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

const EditGroupProductDetailContainer = connect(null,mapDispatchToProps)(EditDetail);

export default EditGroupProductDetailContainer;