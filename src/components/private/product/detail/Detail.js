import React , {Component} from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL, CHIPS_THEME } from '../../../../helpers/constants'
import  SimpleCurrencyInput from  'react-simple-currency'
import Chips  from 'react-chips'

export default class Detail  extends Component {

   

  
    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.props.merge.bind(this)}>
                            <div className="container">
                                 <div className="row center-align">
                                    <div className="input-field col s6 m6 l6">
                                          <input type="checkbox" id="codigoProduto" name="codigoGerado"  value={this.props.codigoGerado} onClick={this.props.handleCheckbox}  />
                                          <label htmlFor="codigoProduto">Gerar código Produto</label>
                                    </div>
                                     <div className="input-field col s6 m6 l6">
                                         <input type="checkbox" id="insumo" value={this.props.ehInsumo}  name="insumo" onClick={this.props.handleCheckbox} />
                                         <label htmlFor="insumo">Insumo</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="codigo" ref="codigo" value={this.props.codigo} name="codigo" onChange={this.props.handleInputChange} disabled={this.props.blockCode} type="number" required />
                                        <label htmlFor="codigo" className={this.props.codigo !== '' ? 'active' : ''}>Código</label>
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricao" value={this.props.descricao} name="descricao" onChange={this.props.handleInputChange} type="text" required />
                                        <label htmlFor="descricao" className={this.props.descricao !== '' ? 'active' : ''}>Descrição</label>
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricaoResumida" value={this.props.descricaoResumida} name="descricaoResumida" onChange={this.props.handleInputChange} type="text" required />
                                        <label htmlFor="descricaoResumida" className={this.props.descricaoResumida !== '' ? 'active' : ''}>Descrição Resumida</label>
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <select className="browser-default"  onChange={this.props.handleInputChange} value={this.props.unidadeMedida.type} name="unidadeMedida.type" >
                                            <option value="">Unidade de Medida</option>
                                            {this.props.unidadeList.map(unidade => (<option key={unidade.type} value={unidade.type}>{unidade.descricao}</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <label htmlFor="precoVenda" className="active">Preço</label>
                                        <SimpleCurrencyInput id="precoVenda" value={this.props.precoVenda} unit='R$' precision={2} separator=',' delimiter='.' name="precoVenda" 
                                         onChange={this.props.handleInputChange}
                                         onInputChange={this.onMoneyInputChange} />                                    
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <label htmlFor="dias" className="active" style={{paddingBottom:'8px'}} >Disponibilidade</label>
                                        <Chips id="dias"  theme={CHIPS_THEME}
                                            value={this.props.diasDisponibilidades}
                                            onChange={this.props.updateAvailableDays}
                                            suggestions={this.props.diasSemana} />
                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail customButtons={this.props.customButtons}  customResponsiveButtons={this.props.customResponsiveButtons} searchUrl={URL.GROUP_PRODUCT} submitRef={this.props.submitRef}   />
                        </form>
                    </div>
                </div>
            </div>
        );
    }


}