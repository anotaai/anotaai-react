import React, { Component } from 'react'
import { PanelHeader, PanelFooterDetail } from '../../../panels'
import { URL, AUTO_COMPLETE_WRAPPER_STYLE, AUTO_COMPLETE_MENU_STYLE } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
import Autocomplete from 'react-autocomplete'
import { Icon } from '../../../../domain/Icon';

export default class Detail extends Component {

    merge(e) {
        
      e.preventDefault();

      if(this.props.setor.id === null) {
         Toast.show('setor.required', Icon.WARNING);
      } else {
         this.props.merge(e);
      }

    } 


    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label={this.props.title} />
                    <div className="panel">
                        <form onSubmit={this.merge.bind(this)}>
                            <div className="container">
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="nome" ref="nome" value={this.props.nome} name="nome" required onChange={this.props.handleInputChange} type="text" />
                                        <label htmlFor="nome" className={this.props.editMode === 'S' && this.props.nome != null ? 'active' : ''}>Nome</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12">
                                        <input id="descricao" type="text" required value={this.props.descricao} name="descricao" onChange={this.props.handleInputChange} />
                                        <label htmlFor="descricao" className={this.props.editMode === 'S' && this.props.descricao != null ? 'active' : ''} >Descrição</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m12 l12">

                                        <label htmlFor="sector-autocomplete">Setor</label>

                                        <Autocomplete
                                            inputProps={{ id: 'sector-autocomplete' }}
                                            ref="autocomplete"
                                            value={this.props.setor.nome}
                                            wrapperStyle={AUTO_COMPLETE_WRAPPER_STYLE}
                                            menuStyle={AUTO_COMPLETE_MENU_STYLE}
                                            renderItem={(item, isHighlighted) =>
                                                <div id={item.id}  key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                    {item.nome}
                                                </div>
                                            }
                                            items={this.props.setores}
                                            getItemValue={(item) => item.nome}
                                            onSelect={(value, item) => {
                                                this.props.setSector(item);
                                            }}

                                            onChange={(event, value) => {
                                                this.props.getSector('setor.nome',value);
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <PanelFooterDetail customButtons={this.props.customButtons} customResponsiveButtons={this.props.customResponsiveButtons} searchUrl={URL.GROUP_PRODUCT} submitRef={this.props.submitRef} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}