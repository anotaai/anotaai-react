import React, { Component } from 'react'
import MaskedInput from 'react-maskedinput'

export default class Comprador extends Component {
 
   

    
   
    render() {
        return (
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
                         <button className="btn waves-effect success" style={{marginLeft:'5px'}} type="submit" name="action">Gravar
                           <i className="material-icons right">send</i>
                         </button>
                    </div> 
                </form>
            </div>)
    }
}