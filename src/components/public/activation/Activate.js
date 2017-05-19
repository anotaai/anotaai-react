import React, { Component } from 'react'
import { Link, browserRouter } from 'react-router'
import { URL } from '../../../helpers/constants'
import Icon from '../../../domain/Icon'
import Toast from '../../../helpers/Toast'
import  UserService from '../../../services/UserService'

export default class Activate extends Component {

    componentDidMount() {
        UserService.activation(this.props.params.key).then(response => {
            if (!response.isValid) {
                Toast.show('error.code', Icon.ERROR);
                browserRouter.push(URL.LOGIN);
            }
        }).catch(error => {
            Toast.defaultError();
            browserRouter.push(URL.LOGIN);
        });
    }

    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <h4>
                        <div className="SUCCESS"><i className="medium material-icons left" style={{position: 'relative', top:'-12px'}}>done</i> Ativação efetuada com sucesso, você já pode efetuar o login: <Link to={URL.LOGIN} style={{color: '#3f51b5'}} >Login</Link> </div>
                    </h4>
                </div>
            </div>
        )
    }
}