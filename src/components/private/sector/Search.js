import React, { Component } from 'react'
import FooterPanel from '../../FooterPanel'
import Filters from './Filters'
import DataList from './DataList'
import SectorService from '../../../services/sector/SectorService'
import Toast from '../../../helpers/Toast'
import Paginator from '../Paginator'
import { PAGE_SIZE , URL } from '../../../helpers/constants'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { getObjectNewState, createInstance } from '../../../helpers/jsonHelper'
import { browserHistory } from 'react-router'

class Search extends Component {

    constructor() {
        super();
        this.state = { filteredResults: [], offset: 0, pageCount: 0, nomeSetor: '' }
        this.sendButton = null;
    }

    componentDidMount() {
        this.search();
    }

    search(e) {

        if (e)
         e.preventDefault();

        this.sendButton.setAttribute("disabled", "disabled");
        this.props.showLoading();
        SectorService.listAll(this.state.offset, this.state.nomeSetor).then(response => {
            this.setState({ filteredResults: response.itens.itens, offset: this.state.offset, pageCount: Math.ceil(response.itens.qtdTotalItens / PAGE_SIZE) });
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
            if (this.sendButton !== undefined) {
                this.sendButton.removeAttribute("disabled");
            }
            this.props.hideLoading();
        });
    }


    handlePageClick(offset) {
        const newState = createInstance(this.state);
        newState.offset = offset;
        this.setState(newState, () => {
            this.search();
        });
    }


    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }


    removeItem(id,e) {
         
        e.preventDefault();

        if (confirm('Confirma a exclusão do setor?')) {
            
            this.props.showLoading();
            SectorService.remove(id).then(response => {
                if (response.isValid) {
                    Toast.show(response.messages);
                    const filtered = this.state.filteredResults.filter(item => item.id !== id);
                    const newState = createInstance(this.state);
                    newState.filteredResults = filtered;
                    this.setState(newState);
                }
            }).catch(error => {
                Toast.defaultError();
            }).then(()=>{
                this.props.hideLoading(); 
            });
        }
    }


    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <div className="panel-header">
                        <span className="title-header"><i className="material-icons icon-panel">business_center</i>Setor</span>
                    </div>
                    <div className="panel">
                        <form onSubmit={this.search.bind(this)}>
                            <Filters handleInputChange={this.handleInputChange.bind(this)} nomeSetor={this.state.nomeSetor} />
                            <FooterPanel submitRef={el => this.sendButton = el} newDetailUrl={URL.NEW_SECTOR} label="Pesquisar" />
                            <DataList filteredResults={this.state.filteredResults} removeItem={this.removeItem.bind(this)} />
                            <Paginator handlePageClick={this.handlePageClick.bind(this)} pageCount={this.state.pageCount} resultsLength={this.state.filteredResults.length} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {

    return {

        showLoading: () => {
            dispatch(showLoading());
        },

        hideLoading: () => {
            dispatch(hideLoading());
        }
    }

}

const SearchSectorContainer = connect(null, mapDispatchToProps)(Search);

export default SearchSectorContainer; 