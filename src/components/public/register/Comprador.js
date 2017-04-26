import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaskedInput from 'react-maskedinput'
import EnumService from '../../../services/util/EnumService'
import EnderecoService from '../../../services/registrar/EnderecoService'
import ShowMessage from '../../../helpers/ShowMessage'
import UsuarioService from '../../../services/UsuarioService'
import {toastWarning,toastInfo} from '../../../helpers/constants'
import $ from 'jquery'

export default class Comprador extends Component {


//http://stackoverflow.com/questions/42331416/how-to-call-setstate-in-react-with-nested-objects-and-unknown-key
//http://stackoverflow.com/questions/2061325/javascript-object-key-value-coding-dynamically-setting-a-nested-value

    constructor() {
      super();
      this.cepRetornado = '';
      this.state = {
        cepPesquisa:'',
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
           $(ReactDOM.findDOMNode(this.refs.selectEstado)).on('change',this.handleTripleInputChange.bind(this));
       });      
    }

    handleInputChange(e) {
      this.setState({[e.target.name] : e.target.value});
    }
    
    handleDoubleInputChange(e) {
       const names =  e.target.name.split('.');
       const firstName = names[0];
       const secondName = names[1];
       
       this.setState({[firstName] : {[secondName]:e.target.value} });
    }

     handleTripleInputChange(e) {
         const names =  e.target.name.split('.');
         const firstName = names[0];
         const secondName = names[1];
         const thirdName = names[2];
         const obj = {[secondName]:{[thirdName]:e.target.value}};
         this.setState({[firstName]:obj});
    }

    clearUser(e) {
      e.preventDefault();
      this.setState({usuario:{nome:'',email:'',senha:''},confirmarSenha:'',telefone:''});
    }

    clearAddress(e) {
       e.preventDefault();
       this.cepRetornado = '';
       this.setState({cliente:{endereco:{cep:'',logradouro:'',numero:'',complemento:'',bairro:'',cidade:'',estado:''}}});
       $('#estadosDiv input[type=text]').val('').removeAttr('disabled');
    }

    sendUser(e) {
       e.preventDefault();

       if(this.state.usuario.senha === this.state.confirmarSenha) {
          UsuarioService.save(this.state.usuario).then(response => {
              ShowMessage.show('Sucesso',toastInfo);
          }); 
       } else {
           ShowMessage.show("A senha não confere com a confirmação de senha. Informe novamente.",toastWarning);
           this.setState({confirmarSenha:'',usuario:{senha:''}});
           ReactDOM.findDOMNode(this.refs.senha).focus();
       }
      
    }
 
    handleCepChange(e) {

       const cep = e.target.value;
       const cepReplace = cep.replace('.','').replace('-','');
       const finalizouCep = cepReplace.indexOf('_');
       this.handleInputChange(e);
  
       if(finalizouCep === -1 && cepReplace !== '')  {

            EnderecoService.findCep(cepReplace).then(enderecoRecuperado => {
                 
                if(enderecoRecuperado.logradouro == null) {
                      ShowMessage.show(`Não foi encontrado um endereço para o cep ${cepReplace}`,toastWarning);
                      return;
                }         
                const endereco = {endereco:{cep:cep,logradouro:enderecoRecuperado.logradouro,numero:enderecoRecuperado.numero,complemento:enderecoRecuperado.complemento,bairro:enderecoRecuperado.bairro,cidade:enderecoRecuperado.localidade,estado:enderecoRecuperado.uf}};
                this.cepRetornado = 'S';
                this.setState({cliente:endereco});
                $('#estadosDiv input[type=text]').val(enderecoRecuperado.uf).attr('disabled','disabled');
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
                         <input id="nome" type="text" value={this.state.usuario.nome} name="usuario.nome" onChange={this.handleDoubleInputChange.bind(this)}  required />
                         <label htmlFor="nome">Nome</label>
                    </div>
                    <div className="input-field col s6">
                         <MaskedInput id='telefone' value={this.state.telefone} name="telefone" onChange={this.handleInputChange.bind(this)}   mask="(11) 11111-1111" required placeholder="Telefone" />
                    </div>
                     <div className="input-field col s6">
                         <input id="email" value={this.state.usuario.email} name="usuario.email" className="validate" onChange={this.handleDoubleInputChange.bind(this)} type="email" />
                         <label htmlFor="email"  data-error="Email inválido">Email</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="senha" ref="senha" type="password" className="validate" minLength="6" required value={this.state.usuario.senha} name="usuario.senha" onChange={this.handleDoubleInputChange.bind(this)} />
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
                         <MaskedInput id='cep' value={this.state.cepPesquisa}  mask="11.111-111" required placeholder="Cep" name="cepPesquisa"  onChange={this.handleCepChange.bind(this)}   />
                    </div>
                    <div className="input-field col s6">
                          <input id="logradouro" value={this.state.cliente.endereco.logradouro} disabled={disabled}  type="text" name="cliente.endereco.logradouro"  onChange={this.handleTripleInputChange.bind(this)}  /> 
                          <label htmlFor="logradouro"  className={active}>Logradouro</label>  
                    </div>
                     <div className="input-field col s6">
                         <input id="numero" type="number" value={this.state.cliente.endereco.numero}  name="cliente.endereco.numero" onChange={this.handleTripleInputChange.bind(this)}  />
                         <label htmlFor="numero">Número</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="complemento" type="text" value={this.state.cliente.endereco.complemento}  name="cliente.endereco.complemento" onChange={this.handleTripleInputChange.bind(this)}    />
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
                         <input id="cidade" type="text" required disabled={disabled} value={this.state.cliente.endereco.cidade} onChange={this.handleTripleInputChange.bind(this)} />
                         <label htmlFor="cidade"  className={active}>Cidade</label>
                    </div>

                    <div className="input-field col s6">
                        <input id="bairro" type="text"  disabled={disabled} required value={this.state.cliente.endereco.bairro}  />  
                        <label htmlFor="bairro"  className={active} disabled  onChange={this.handleTripleInputChange.bind(this)} >Bairro</label>
                    </div>                  
    
                    <div className="col s12 panel-footer">
                         <button className="btn waves-effect default" formNoValidate onClick={this.clearAddress.bind(this)}>Limpar
                         </button>
                         <button className="btn waves-effect success" style={{marginLeft:'5px'}} onClick={this.sendUser.bind(this)}  type="submit" name="action">Enviar
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