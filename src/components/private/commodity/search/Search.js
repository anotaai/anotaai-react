import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearForm, list, handlePageClick } from '../../../../actions/searchActionCreator'
import { URL, USE_CASE } from '../../../../helpers/constants'
import Toast from '../../../../helpers/Toast'
import CommodityService from '../../../../services/commodity/CommodityService'
import { PanelHeader, PanelFooter } from '../../../panels'
import Filters from '../../templatesearch/Filters'
import Paginator from '../../templatesearch/Paginator'
import DataList from './DataList'
import { getObjectNewState } from '../../../../helpers/jsonHelper'


class Search extends Component {

    constructor() {
        super();
        this.sendButton = null;
        this.filters = [{ id: 'nome', label: 'Nome Produto'} , {id:'dataEntrada', label:'Data Entrada', type:'date'}];
        this.state = { nome: '' , dataEntrada: '' };
    }

    componentDidMount() {
        this.search();
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    search(e) {

        if (e)
            e.preventDefault();
        
        CommodityService.list(this.props.searchState.offset, this.state.nome, this.state.dataEntrada, this.sendButton).then(response => {
            this.props.list(response);
        }).catch(error => {
            Toast.defaultError();
        });
    }

    handlePageClick(offset) {
        this.props.handlePageClick(offset, this);
    }


    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    render() {

        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="list" label="Entrada de Mercadoria" />
                    <div className="panel">
                        <form onSubmit={this.search.bind(this)}>
                            <Filters handleInputChange={this.handleInputChange.bind(this)} filters={this.filters} />
                            <PanelFooter submitRef={el => this.sendButton = el} newDetailUrl={URL.NEW_COMMODITY} label="Pesquisar" />
                            <DataList filteredResults={this.props.searchState.filteredResults} editUrl={URL.COMMODITY}  />
                            <Paginator handlePageClick={this.handlePageClick.bind(this)} pageCount={this.props.searchState.pageCount} resultsLength={this.props.searchState.filteredResults.length} />
                        </form>
                    </div>
                </div>
            </div>
        )

    }

}

const mapStateToProps = state => {
    return { searchState: state.searchCommodity }
}

const mapDispatchToProps = dispatch => {
    return {
        list: (filteredResults) => {
            dispatch(list(USE_CASE.SEARCH_COMMODITY, filteredResults));
        },
        handlePageClick: (offset, reactContext) => {
            new Promise((resolve) => {
                resolve(dispatch(handlePageClick(USE_CASE.SEARCH_COMMODITY, offset)));
            }).then(() => {
                reactContext.search();
            });
        },
        clearForm: () => {
            dispatch(clearForm(USE_CASE.SEARCH_COMMODITY));
        }
    }
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);
export default SearchContainer;
