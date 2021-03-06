import React, { Component } from 'react';
import Toast from '../../../helpers/Toast';
import { PanelFooter } from '../../panels'
import { URL } from '../../../helpers/constants';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import FormUser from './FormUser';
import UserService from '../../../services/UserService';
import { handleInputChange, clearForm, handlePhoneChange, clearPassword } from '../../../actions/compradorActionCreator';
import { Icon } from '../../../domain/Icon';

class Comprador extends Component {

    constructor() {
        super();
        this.sendButton = null;
    }

    componentDidMount() {
        const key = this.props.params.key;
        if(key)
         this.props.getUserByActivationKey(key);
    }

    componentWillUnmount() {
         this.props.clearForm();
    }

    save(e) {
        
        e.preventDefault();

        if (this.props.compradorState.usuario.senha !== this.props.compradorState.confirmarSenha) {
             Toast.show('usuario.senha.naoconfere', Icon.WARNING);
             this.props.clearPassword();
        } else {
            
            if (this.props.compradorState.activation) {
                this.activate();
                return;
            }

            UserService.save(this.props.compradorState.usuario, this.props.compradorState.telefone, this.sendButton).then(response => {
                Toast.show(response.messages);
                if (response.isValid) {
                    browserHistory.push(URL.LOGIN);
                }
            }).catch(error => {
                console.log('ERRO [components\\public\\register\\Comprador.js 49]');
            });
        }

    }

    activate() {

        UserService.activationUser(this.props.compradorState.usuario, this.props.compradorState.telefone, this.sendButton).then(response => {
            Toast.show(response.messages);
            if (response.isValid) {
                browserHistory.push(URL.LOGIN);
            }
        }).catch(error => {
            console.log('ERRO [components\\public\\register\\Comprador.js 63]');
        });

    }

    render() {
        return (
            <form method="post" onSubmit={this.save.bind(this)}>
                <FormUser {... this.props.compradorState} 
                  handleInputChange={this.props.handleInputChange} 
                  handlePhoneChange={this.props.handlePhoneChange}
                  panelFooter={<PanelFooter submitRef={el => this.sendButton = el} clearForm={this.props.clearForm} label={this.props.compradorState.activation === true ? "Ativar" : "Enviar"} public />}
                 />
               
            </form>
        )
    }

}

const mapStateToProps = state => {
    return { compradorState: state.comprador }
}

const mapDispatchToProps = dispatch => {

    return {
        handleInputChange: (e) => {
            dispatch(handleInputChange(e.target.name, e.target.value));
        },
        clearForm: () => {
            dispatch(clearForm());
        },
        clearPassword: () => {
            dispatch(clearPassword());
        }, 
        handlePhoneChange: (e) => {
            dispatch(handlePhoneChange(e));
        },
        getUserByActivationKey:(key) => {
            dispatch(UserService.getUserByActivationKey(key));
        }
    }
}

const CompradorContainer = connect(mapStateToProps, mapDispatchToProps)(Comprador);

export default CompradorContainer;