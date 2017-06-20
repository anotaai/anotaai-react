import React, { Component } from 'react'
import { connect } from 'react-redux'


class NewDetail extends Component {
   
     render() {
         return (
            <div> NewDetail </div>
         )
     }
    
}

 const mapStateToProps = state => {
     return { };
 }

 const mapDispatchToProps = dispatch => {
     return {  }
 }
     
const NewProductDetailContainer = connect(mapStateToProps,mapDispatchToProps)(NewDetail);
export default NewProductDetailContainer;