import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import blank_avatar from '../../../img/blank_avatar.png'
import Toast from '../../../helpers/Toast'
import { Icon } from '../../../domain/Icon'
import { connect } from 'react-redux'
import ProfileService from '../../../services/profile/ProfileService'


class Settings extends Component {

    constructor() {
        super();
        this.state = {picture: {preview: blank_avatar}};
    }


    dropPicture(file,rejected) {
        if(rejected.length > 0) {
            Toast.show('formatos.permitidos.warning',Icon.WARNING);
        } else {
             const picture = file[0];
             
              this.setState({picture});

             ProfileService.upload(picture).then(response => {
                

                Toast.show(response.messages);
                
             }).catch(error => {
                Toast.defaultError();
             });
            
        }      
    }

    render() {

        return (
            <div>
                <div className="section"></div>
                <div className="container">
                    <div className="z-depth-1 panel-header" >
                        <span className="title-header"> <i className="material-icons icon-panel">account_circle</i> User Settings </span>
                    </div>
                    <div className="z-depth-1 panel row">
                        <div className="row">
                         <div className="col s9 m10 l6"> 
                            <div className="col s9 m10 l6" style={{marginLeft: '60px'}}>
                                <Dropzone accept="image/jpeg, image/png" onDrop={this.dropPicture.bind(this)} style={{ boderStyle: 'none' }}  >
                                    <img src={this.state.picture.preview} alt="Avatar" className="circle responsive-img" />
                                    <div className="center-align profile-image-settings">Change</div>
                                </Dropzone>
                            </div>
                          </div>
                          <div className="col s12 m12 l6"> 
                              <div className="row"> 
                                  <label className="settings-title">Personal Information</label>  
                              </div>
                              <div className="row">
                                  <label style={{fontWeight: 'bold'}}> Nome </label>
                                  <label> {this.props.loginState.login.primeiroNome} </label>
                                  <hr></hr>    
                              </div>
                              <div className="row">
                                  <label style={{fontWeight: 'bold'}}> Telefone </label>
                                  <label> {this.props.loginState.login.telefoneStr} </label>    
                                  <hr></hr> 
                              </div>
                              {this.props.loginState.login.email !== null && 
                               <div className="row">
                                  <label style={{fontWeight: 'bold'}}> Email </label>
                                  <label> {this.props.loginState.login.email} </label>  
                                  <hr></hr>   
                                </div>
                              }

                              {this.props.loginState.login.endereco !== null && 
                                 <div className="row">
                                  <label style={{fontWeight: 'bold'}}> Endereço </label>
                                  <label> {this.props.loginState.login.endereco} </label>  
                                  <hr></hr>   
                                 </div>
                              }
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => {
        return {loginState : state.auth.loginState}
}


const SettingsContainer = connect(mapStateToProps)(Settings);

export default SettingsContainer;