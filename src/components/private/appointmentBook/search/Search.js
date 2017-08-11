import React , { Component } from 'react'
import { connect } from 'react-redux'


class Search extends Component {
      
    render() {
        return(
            <div>Grande Olinda!</div>
        )
    }
}


const mapStateToProps = state => {
    return { searchState : state.searchAppointmentBook  }
}

const mapDispatchToProps = dispatch => {
   return {

   }
}


const SearchAppointmentBookContainer = connect(mapStateToProps,mapDispatchToProps)(Search);
export default SearchAppointmentBookContainer;