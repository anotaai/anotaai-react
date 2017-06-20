import React, { Component } from 'react'
import { connect } from 'react-redux'


class EditDetail extends Component {
   
     render() {
         return (
            <div> EditDetail </div>
         )
     }
    
}

 const mapStateToProps = state => {
     return { };
 }

 const mapDispatchToProps = dispatch => {
     return {  }
 }
     
const EditProductDetailContainer = connect(mapStateToProps,mapDispatchToProps)(EditDetail);
export default EditProductDetailContainer;