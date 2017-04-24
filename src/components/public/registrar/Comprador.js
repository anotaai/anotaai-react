import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'
import EnumService from '../../../services/util/EnumService'
import $ from 'jquery'

export default class Comprador extends Component {

    constructor() {
      super();
      this.state = {estadoList:[]};
    }
    
    componentWillMount() {
       
       EnumService.load('estados').then(json => {
         this.setState({estadoList:json});
         $('#estados').material_select();
       });
      
    }
 
    render() {



        return (
          <div>
            <div className="container">
              <div className="section"></div>
                
               <div className="z-depth-1 panel-header" >
                    <span className="title-header" >Dados Comprador</span>
                </div>

                <form className="z-depth-1 panel row" style={{marginLeft: '0'}} method="post">
               
                    <div className="input-field col s6">
                         <input id="nome" type="text"  required />
                         <label htmlFor="nome">Nome</label>
                    </div>
                    <div className="input-field col s6">
                         <MaskedInput id='telefone'  mask="(11) 11111-1111" required placeholder="Telefone" />
                    </div>
                     <div className="input-field col s6">
                         <input id="email" type="email" />
                         <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="senha" type="password" required />
                         <label htmlFor="senha">Senha</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="confirmarSenha" type="password" required />
                         <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    </div>
                   
                    <div className="section"></div>

                    <div className="col s12 panel-footer">
                         <button className="btn waves-effect default" formNoValidate>Limpar
                         </button>
                         <button className="btn waves-effect success" style={{marginLeft:'5px'}} type="submit" name="action">Enviar
                           <i className="material-icons right">send</i>
                         </button>
                    </div> 
                </form>
            </div>

             <div className="container">
              <div className="section"></div>
                
               <div className="z-depth-1 panel-header" >
                    <span className="title-header" >Dados Endereço</span>
                </div>

                <form className="z-depth-1 panel row" style={{marginLeft: '0',marginRight:'0'}} method="post">
               
                    <div className="input-field col s6">
                         <MaskedInput id='cep'  mask="11.111-111" required placeholder="Cep" />
                    </div>
                    <div className="input-field col s6">
                          <input id="logradouro" type="text" />
                          <label htmlFor="logradouro">Logradouro</label>  
                    </div>
                     <div className="input-field col s6">
                         <input id="numero" type="number" />
                         <label htmlFor="numero">Número</label>
                    </div>
                    <div className="input-field col s6">
                         <input id="complemento" type="text"  />
                         <label htmlFor="complemento">Complemento</label>
                    </div>

                    <div className="input-field col s6">
                        
                        <select id="estados" >
                          <option value=""></option>
                          {this.state.estadoList.map(estado => (<option key={estado.type}  value={estado.type}>{estado.descricao}</option>))}
                         </select>
                         <label htmlFor="estado">Estado</label>

                    </div>

                    <div className="input-field col s6">
                         <input id="cidade" type="text" required />
                         <label htmlFor="cidade">Cidade</label>
                    </div>

                    <div className="input-field col s6">
                         <input id="bairro" type="text" required />
                         <label htmlFor="bairro">Bairro</label>
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
          </div>)
    }
}