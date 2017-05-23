import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading , hideLoading } from 'react-redux-loading-bar'

class Detail extends Component {



    render() {
        return (
            <div>
            </div>
        );
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

const DetailContainer = connect(mapDispatchToProps)(Detail);

export default DetailContainer;