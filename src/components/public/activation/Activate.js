import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { URL } from '../../../helpers/constants'
import Icon from '../../../domain/Icon'
import Toast from '../../../helpers/Toast'
import  UserService from '../../../services/UserService'

export default class Activate extends Component {

    constructor() {
        super();
        this.state = {activated: false}
    }

    componentDidMount() {
        UserService.activation(this.props.params.key).then(response => {
            if (response.isValid) {
                this.setState({activated: true})
            } else {
                Toast.show('error.code', Icon.ERROR);
                browserHistory.push(URL.LOGIN);
            }
        }).catch(error => {
            Toast.defaultError();
            browserHistory.push(URL.LOGIN);
        });
    }

    render() {

        if (this.state.activated) {
            return (
                <div className="space-container">
                    <div className="container">
                        <h4>
                            <div><i className="medium material-icons left" style={{ position: 'relative', top: '-12px' }}>done</i> Ativação efetuada com sucesso, você já pode efetuar o login: <Link to={URL.LOGIN} style={{ color: '#3f51b5' }} >Login</Link> </div>
                        </h4>
                    </div>
                </div>
            )
        } else  
            return null;
    }
}