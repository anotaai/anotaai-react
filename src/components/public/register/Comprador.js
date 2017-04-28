import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaskedInput from 'react-maskedinput'
import EnumService from '../../../services/util/EnumService'
import AddressService from '../../../services/register/AddressService'
import ClienteConsumidorService from '../../../services/client/ClienteConsumidorService'
import ShowMessage from '../../../helpers/ShowMessage'
import UsuarioService from '../../../services/UsuarioService'
import {toastWarning,toastInfo,toastError} from '../../../helpers/constants'
import {getObjectNewState,createInstance} from '../../../helpers/jsonHelper'
import ClientService from '../../../services/ClientService'
import $ from 'jquery'

export default class Comprador extends Component {

    constructor() {
      super();
      this.cepRetornado = '';
      this.state = {
        usuario:{nome:'',email:'',senha:''},
        cliente:{nomeComercial:'',cpf:'', endereco:{cep:'',logradouro:'',numero:'',complemento:'',bairro:'',cidade:'',estado:''}}, 
        estadoList:[],
        confirmarSenha:'',
        telefone:''};
    }
    
    componentDidMount() {          
       EnumService.load('estados').then(json => {
          this.setState({estadoList:json});   
           $('#estados').material_select();
           $(ReactDOM.findDOMNode(this.refs.selectEstado)).on('change',this.handleInputChange.bind(this));
       }).catch(error => {
            console.log(error);
            ShowMessage.show(`Ocorreu um erro ao recuperar o serviço de estados`,toastError)
       });      
    }

    handleInputChange(e) {
      const newState =  getObjectNewState(e.target.name,e.target.value,this.state);
      this.setState(newState);
    }

    clearUser(e) {
      e.preventDefault();
      const newState = createInstance(this.state);
      newState.usuario.nome = '';
      newState.usuario.email = '';
      newState.usuario.senha = '';
      newState.confirmarSenha = '';
      newState.telefone = '';
      this.setState(newState);
      ReactDOM.findDOMNode(this.refs.nome).focus();
    }

    clearAddress(e) {
       e.preventDefault();
       this.cepRetornado = '';
       const newState = createInstance(this.state);
       newState.cliente.endereco.cep = '';
       newState.cliente.endereco.logradouro = '';
       newState.cliente.endereco.numero = '';
       newState.cliente.endereco.complemento = '';
       newState.cliente.endereco.bairro = '';
       newState.cliente.endereco.cidade = '';
       newState.cliente.endereco.estado = '';
       this.setState(newState);
       $('#estadosDiv input[type=text]').val('').removeAttr('disabled');
       ReactDOM.findDOMNode(this.refs.cep).focus();

    }

    sendUser(e) {
       e.preventDefault();

       if(this.state.usuario.senha === this.state.confirmarSenha) {
          UsuarioService.save(this.state.usuario,this.state.telefone).then(response => {
              ShowMessage.show("Sucesso",toastInfo);
          }).catch(error => {
             ShowMessage.show('Ocorreu um erro ao incluir o usuário', toastError);
          }); 
       } else {
           ShowMessage.show("A senha não confere com a confirmação de senha. Informe novamente.",toastWarning);
           const newState = createInstance(this.state);
           newState.usuario.senha = '';
           newState.confirmarSenha = '';
           this.setState(newState);
           ReactDOM.findDOMNode(this.refs.senha).focus();
       }
      
    }

    sendClient(e) {
      e.preventDefault();
      
      ClientService.save(this.state.cliente,this.state.usuario,this.state.telefone).then(response => {
         ShowMessage.show("Registro incluído com sucesso",toastInfo);
      }).catch(error => {
          ShowMessage("Ocorreu um erro ao incluir o comprador",toastError);
      });
    }

    handlePhoneChange(e) {
       const telefone = e.target.value;
       const telefoneReplace = telefone.replace('(','').replace(')','').replace('-','');
       const finalizouTelefone = telefoneReplace.indexOf('_');
       this.handleInputChange(e); 
      
       if(finalizouTelefone === -1 && telefoneReplace !== '')  {
           ClienteConsumidorService.findUsuarioByPhone(telefoneReplace)
            .then(response => {
                   alert(response);
            })
            .catch(error => {
                ShowMessage.show('Ocorreu um erro ao recuperar o telefone do usuário',toastError);
            })
       }
    }
 
    handleCepChange(e) {

       const cep = e.target.value;
       const cepReplace = cep.replace('.','').replace('-','');
       const finalizouCep = cepReplace.indexOf('_');
       this.handleInputChange(e);
  
       if(finalizouCep === -1 && cepReplace !== '')  {

            AddressService.findCep(cepReplace).then(enderecoRecuperado => {
                 
                if(enderecoRecuperado.logradouro == null) {
                      ShowMessage.show(`Não foi encontrado um endereço para o cep ${cepReplace}`,toastWarning);
                      return;
                }
                const newState = createInstance(this.state);
                newState.cliente.endereco.logradouro =   enderecoRecuperado.logradouro;
                newState.cliente.endereco.numero =   enderecoRecuperado.numero;
                newState.cliente.endereco.complemento = enderecoRecuperado.numero;
                newState.cliente.endereco.bairro = enderecoRecuperado.bairro;
                newState.cliente.endereco.cidade = enderecoRecuperado.localidade;
                newState.cliente.endereco.estado = enderecoRecuperado.uf;
                this.cepRetornado = 'S';
                this.setState(newState);
                $('#estadosDiv input[type=text]').val(enderecoRecuperado.uf).attr('disabled','disabled');
             }).catch(error => {
                console.error(error);
                ShowMessage.show(`Ocorreu um erro ao recuperar o cep ${cep}`,toastError)
             });

        } else {
            this.clearAddress(e);
        }
    
    }

   

    render() {
      
        const  active =  (this.cepRetornado ===  'S' ?  'active-label' : ''); 
        const  disabled =  (this.cepRetornado ===  'S' ?  'disabled' : ''); 
    
        return (
          <div>
             <div className="section"></div>
              <div className="container">
            
               <div className="z-depth-1 panel-header" >
                    <span className="title-header" >Dados Comprador</span>
                </div>
                <form className="z-depth-1 panel row"  method="post">
                    <div className="input-field col s6">
                         <input id="nome" ref="nome"  type="text" value={this.state.usuario.nome} name="usuario.nome" onChange={this.handleInputChange.bind(this)}  required />
                         <label htmlFor="nome">Nome</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="nomeComercial"   type="text" value={this.state.cliente.nomeComercial} name="cliente.nomeComercial" onChange={this.handleInputChange.bind(this)}  required />
                         <label htmlFor="nomeComercial">Nome Comercial</label>
                    </div>
                     <div className="input-field col s6">
                        <MaskedInput id='cpf' value={this.state.cliente.cpf} name="cliente.cpf" onChange={this.handleInputChange.bind(this)}   mask="111.111.111-11" required placeholder="Cpf" />
                    </div>
                    <div className="input-field col s6">
                         <MaskedInput id='telefone' value={this.state.telefone} name="telefone" onChange={this.handlePhoneChange.bind(this)}   mask="(11) 11111-1111" required placeholder="Telefone" />
                    </div>
                     <div className="input-field col s6">
                         <input id="email" value={this.state.usuario.email} name="usuario.email" className="validate" onChange={this.handleInputChange.bind(this)} type="email" />
                         <label htmlFor="email"  data-error="Email inválido">Email</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="senha" ref="senha" type="password" className="validate" minLength="6" required value={this.state.usuario.senha} name="usuario.senha" onChange={this.handleInputChange.bind(this)} />
                         <label htmlFor="senha" data-error="A senha deve conter no mínimo 6 caracteres">Senha</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="confirmarSenha"  className="validate"  type="password" minLength="6" required value={this.state.confirmarSenha} name="confirmarSenha" onChange={this.handleInputChange.bind(this)} />
                         <label htmlFor="confirmarSenha" data-error="A senha deve conter no mínimo 6 caracteres">Confirmar Senha</label>
                    </div>

                    <div className="col s12 panel-footer">
                         <button className="btn waves-effect default" formNoValidate onClick={this.clearUser.bind(this)}>Limpar
                         </button>
                         <button className="btn waves-effect success" style={{marginLeft:'5px'}} type="submit" name="action" onClick={this.sendUser.bind(this)}>Enviar
                           <i className="material-icons right">send</i>
                         </button>
                    </div> 
                </form>
            </div>
  
            <div className="section"></div>
            
             <div className="container">    
               <div className="z-depth-1 panel-header" >
                    <span className="title-header">Dados Endereço</span>
                </div>

                <form className="z-depth-1 panel row"  method="post">
               
                    <div className="input-field col s6">
                         <MaskedInput id='cep' ref="cep" value={this.state.cliente.endereco.cep}  mask="11.111-111" required placeholder="Cep" name="cliente.endereco.cep"  onChange={this.handleCepChange.bind(this)}   />
                    </div>
                    <div className="input-field col s6">
                          <input id="logradouro" value={this.state.cliente.endereco.logradouro} disabled={disabled}  type="text" name="cliente.endereco.logradouro"  onChange={this.handleInputChange.bind(this)}  /> 
                          <label htmlFor="logradouro"  className={active}>Logradouro</label>  
                    </div>
                     <div className="input-field col s6">
                         <input id="numero" type="number" value={this.state.cliente.endereco.numero}  name="cliente.endereco.numero" onChange={this.handleInputChange.bind(this)}  />
                         <label htmlFor="numero">Número</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="complemento" type="text" value={this.state.cliente.endereco.complemento}  name="cliente.endereco.complemento" onChange={this.handleInputChange.bind(this)}    />
                         <label htmlFor="complemento">Complemento</label>
                    </div>

                    <div id="estadosDiv" className="input-field col s6">
                        
                        <select id="estados" ref="selectEstado"  /* className="browser-default" */  disabled={disabled}  value={this.state.cliente.endereco.estado}   name="cliente.endereco.estado"   >
                          <option value=""></option>
                            {this.state.estadoList.map(estado => (<option key={estado.type}  value={estado.type}>{estado.descricao}</option>))}
                         </select>
                         <label htmlFor="estados">Estado</label>

                    </div>

                    <div className="input-field col s6">
                         <input id="cidade" type="text" required disabled={disabled} value={this.state.cliente.endereco.cidade} onChange={this.handleInputChange.bind(this)} />
                         <label htmlFor="cidade"  className={active}>Cidade</label>
                    </div>

                    <div className="input-field col s6">
                        <input id="bairro" type="text"  disabled={disabled} required value={this.state.cliente.endereco.bairro}  />  
                        <label htmlFor="bairro"  className={active} disabled  onChange={this.handleInputChange.bind(this)} >Bairro</label>
                    </div>                  
    
                    <div className="col s12 panel-footer">
                         <button className="btn waves-effect default" formNoValidate onClick={this.clearAddress.bind(this)}>Limpar
                         </button>
                         <button className="btn waves-effect success" style={{marginLeft:'5px'}} onClick={this.sendClient.bind(this)}  type="submit" name="action">Enviar
                           <i className="material-icons right">send</i>
                         </button>
                    </div> 
                </form>
            </div>
               <div className="section"></div>
               <div className="section"></div>
               <div className="section"></div>
          </div>)
    }
}