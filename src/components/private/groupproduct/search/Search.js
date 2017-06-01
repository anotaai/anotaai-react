import React, { Component } from 'react'
import DataList from './DataList'
import { connect } from 'react-redux'
import { showLoading , hideLoading } from 'react-redux-loading-bar'
import Toast from '../../../../helpers/Toast'
import Filters from '../../searchtemplate/Filters'
import Paginator from '../../searchtemplate/Paginator'
import { PAGE_SIZE, URL } from '../../../../helpers/constants'
import { PanelHeader, PanelFooter } from '../../../panels'

class Search extends Component {
    
    constructor() {
        super();
        this.state = { filteredResults: [], offset: 0, pageCount: 0, nome: '' }
        this.sendButton = null;
    }
    
    search() {

    }

    handleInputChange() {

    }

    handlePageClick() {

    }

    remove() {

    }

    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label="Grupo de Produto" />
                    <div className="panel">
                        <form onSubmit={this.search.bind(this)}>
                            <Filters basicId="nomeSetor" basicLabel="Nome" handleInputChange={this.handleInputChange.bind(this)} basicField={this.state.nome} />
                            <PanelFooter submitRef={el => this.sendButton = el} newDetailUrl={URL.NEW_GROUP_PRODUCT} label="Pesquisar" />
                            <DataList filteredResults={this.state.filteredResults} remove={this.remove.bind(this)} />
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

const SearchGroupProductContainer = connect(null,mapDispatchToProps)(Search);

export default SearchGroupProductContainer;
