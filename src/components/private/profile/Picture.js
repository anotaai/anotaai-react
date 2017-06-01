import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { CSSTransitionGroup } from 'react-transition-group'


class Picture extends Component {


    render() {

        return (
            <CSSTransitionGroup
                transitionName="anotaai"
                transitionAppear={true}
                transitionAppearTimeout={500}>
                <div className="col s9 m10 l6">
                    <div className="col s9 m10 l7 offset-s1 offset-m2 offset-l2">
                        <Dropzone accept="image/jpeg, image/png" onDrop={this.props.handleDrop.bind(this)} style={{ boderStyle: 'none' }}  >
                            <img src={this.props.pictureState} alt="Avatar" className="circle settings-image" />
                            <div className="settings-caption-image">Change</div>
                        </Dropzone>
                    </div>
                </div>
            </CSSTransitionGroup>
        )
    }
}


const mapStateToProps = state => {
    return { pictureState: state.profilePicture.pictureState }
}

const PictureContainer = connect(mapStateToProps)(Picture);

export default PictureContainer;