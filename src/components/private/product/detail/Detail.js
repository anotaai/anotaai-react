import React , {Component} from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL } from '../../../../helpers/constants'

export default class Detail  extends Component {



  
    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.props.merge.bind(this)}>
                            <div className="container">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="codigo" ref="codigo" value={this.props.codigo} name="nome" onChange={this.props.handleInputChange} type="number" required />
                                        <label htmlFor="codigo" className={this.props.codigo != null ? 'active' : ''}>Código</label>
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricao" value={this.props.descricao} name="descricao" onChange={this.props.handleInputChange} type="text" required />
                                        <label htmlFor="descricao" className={this.props.descricao != null ? 'active' : ''}>Descrição</label>
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricaoResumida" value={this.props.descricaoResumida} name="descricaoResumida" onChange={this.props.handleInputChange} type="text" required />
                                        <label htmlFor="descricaoResumida" className={this.props.codigo != null ? 'active' : ''}>Descrição Resumida</label>
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