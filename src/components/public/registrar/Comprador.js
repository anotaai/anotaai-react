import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'
import EnumService from '../../../services/util/EnumService'
import EnderecoService from '../../../services/registrar/EnderecoService'
import $ from 'jquery'

export default class Comprador extends Component {

    

    constructor() {
      super();
      this.state = {
        usuario:{nome:'',email:'',senha:''},
        cliente:{nomeComercial:'',cpf:'', endereco:{cep:'',logradouro:'',numero:'',complemento:'',bairro:'',cidade:'',estado:''}}, 
        estadoList:[],
        confirmarSenha:'',
        telefone:''};
    }
    
    componentWillMount() {   
       EnumService.load('estados').then(json => {
         this.setState({estadoList:json});
         $('#estados').material_select();
       });      
    }

    handleInputChange(e) {
      var name = e.target.name;
      var value = e.target.value;
      this.setState({[name] : value });
    }
    
    handleDoubleInputChange(e) {
         const value = e.target.value;
         const names =  e.target.name.split('.');
         const firstName = names[0];
         const secondName = names[1];
         const obj = {secondName:[value]};
         this.setState({[firstName] : obj });
    }

     handleTripleInputChange(e) {
         const value = e.target.value;
         const names =  e.target.name.split('.');
         const firstName = names[0];
         const secondName = names[1];
         const thirdName = names[2];
         const obj = {firstName: {secondName:{thirdName:[value]}}};
         this.setState({[firstName] : obj });
    }

    handleBlurChange(e) {
        
       if(this.state.cliente.endereco.cep != '' && this.state.cliente.endereco.cep.length > 10) {

       }
    }




    render() {

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
                         <MaskedInput id='telefone' value={this.state.telefone} name="telefone" onChange={this.handleInputChange.bind(this)}     mask="(11) 11111-1111" required placeholder="Telefone" />
                    </div>
                     <div className="input-field col s6">
                         <input id="email" value={this.state.usuario.email} name="usuario.email" onChange={this.handleDoubleInputChange.bind(this)} type="email" />
                         <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="senha" type="password" required value={this.state.usuario.senha} name="usuario.senha" onChange={this.handleDoubleInputChange.bind(this)} />
                         <label htmlFor="senha">Senha</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="confirmarSenha" type="password" required value={this.state.confirmarSenha} name="usuario.confirmarSenha" onChange={this.handleDoubleInputChange.bind(this)} />
                         <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    </div>

                    <div className="col s12 panel-footer">
                         <button className="btn waves-effect default" formNoValidate>Limpar
                         </button>
                         <button className="btn waves-effect success" style={{marginLeft:'5px'}} type="submit" name="action">Enviar
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
                         <MaskedInput id='cep' value={this.state.cliente.endereco.cep}  mask="11.111-111" required placeholder="Cep" name="cliente.endereco.cep" onChange={this.handleTripleInputChange.bind(this)}  onBlur={this.handleBlurChange.bind(this)} />
                    </div>
                    <div className="input-field col s6">
                          <input id="logradouro" value={this.state.cliente.endereco.logradouro}  type="text" name="cliente.endereco.logradouro" onChange={this.handleTripleInputChange.bind(this)}  />
                          <label htmlFor="logradouro">Logradouro</label>  
                    </div>
                     <div className="input-field col s6">
                         <input id="numero" type="number" value={this.state.cliente.endereco.numero} name="cliente.endereco.numero" onChange={this.handleTripleInputChange.bind(this)}  />
                         <label htmlFor="numero">Número</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="complemento" type="text"  name="cliente.endereco.complemento" onChange={this.handleTripleInputChange.bind(this)}    />
                         <label htmlFor="complemento">Complemento</label>
                    </div>

                    <div className="input-field col s6">
                        
                        <select id="estados" value={this.state.cliente.endereco.estado}   name="cliente.endereco.estado" onChange={this.handleTripleInputChange.bind(this)} >
                          <option value=""></option>
                          {this.state.estadoList.map(estado => (<option key={estado.type}  value={estado.type}>{estado.descricao}</option>))}
                         </select>
                         <label htmlFor="estado">Estado</label>

                    </div>

                    <div className="input-field col s6">
                         <input id="cidade" type="text" required value={this.state.cliente.endereco.cidade} onChange={this.handleTripleInputChange.bind(this)} />
                         <label htmlFor="cidade">Cidade</label>
                    </div>

                    <div className="input-field col s6">
                         <input id="bairro" type="text" required />
                         <label htmlFor="bairro" value={this.state.cliente.endereco.bairro} onChange={this.handleTripleInputChange.bind(this)} >Bairro</label>
                    </div>                  
    
                    <div className="col s12 panel-footer">
                         <button className="btn waves-effect default" formNoValidate>Limpar
                         </button>
                         <button className="btn waves-effect success" style={{marginLeft:'5px'}} type="submit" name="action">Enviar
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