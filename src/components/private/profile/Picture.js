import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

class Picture extends Component {

    dropPicture(file,rejected) {
        this.props.handleDrop(file,rejected);
    }

    render() {

        return (
            <div className="col s9 m10 l6">
                <div className="col s9 m10 l7" style={{ marginLeft: '50px' }}>
                    <Dropzone accept="image/jpeg, image/png" onDrop={this.dropPicture.bind(this)} style={{ boderStyle: 'none' }}  >
                        <img src={this.props.pictureState} alt="Avatar" className="circle responsive-img" />
                        <div className="center-align profile-image-settings">Change</div>
                    </Dropzone>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {pictureState: state.profilePicture.pictureState}
}

const PictureContainer = connect(mapStateToProps)(Picture);

export default PictureContainer;