import React, { Component } from 'react'
import { PanelHeader, PanelFooter } from '../../../panels'
import SectorService from '../../../../services/sector/SectorService'
import Toast from '../../../../helpers/Toast'
import Filters from '../../templatesearch/Filters'
import Paginator from '../../templatesearch/Paginator'
import DataList from '../../groupproduct/search/DataList'
import { URL, defaultFilters, USE_CASE } from '../../../../helpers/constants'
import { connect } from 'react-redux'
import { getObjectNewState } from '../../../../helpers/jsonHelper'
import { clearForm, list, remove, handlePageClick, showModal, hideModal } from '../../../../actions/searchActionCreator'

class Search extends Component {

    constructor() {
        super();
        this.sendButton = null;
        this.filters = defaultFilters;
        this.state = { nome: '' }
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

        SectorService.list(this.props.searchState.offset, this.state.nome, this.sendButton).then(response => {
            this.props.list(response);
        }).catch(error => {
            console.log('ERRO [components\\private\\sector\\search\\Search.js 39]');
        });
    }


    handlePageClick(offset) {
        this.props.handlePageClick(offset, this);
    }

    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    remove() {
        this.props.remove(this.props.searchState.idRemove);
    }


    render() {
        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label="Setor" />
                    <div className="panel">
                        <form onSubmit={this.search.bind(this)}>
                            <Filters handleInputChange={this.handleInputChange.bind(this)} filters={this.filters} />
                            <PanelFooter submitRef={el => this.sendButton = el} newDetailUrl={URL.NEW_SECTOR} label="Pesquisar" />
                            <DataList filteredResults={this.props.searchState.filteredResults} remove={this.remove.bind(this)} editUrl={URL.SECTOR} showModal={this.props.showModal} hideModal={this.props.hideModal} showModalState={this.props.searchState.showModalState} text="Confirma a exclusão do setor?" />
                            <Paginator handlePageClick={this.handlePageClick.bind(this)} pageCount={this.props.searchState.pageCount} resultsLength={this.props.searchState.filteredResults.length} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { searchState: state.searchSector }
}
const mapDispatchToProps = dispatch => {
    return {
        list: (filteredResults) => {
            dispatch(list(USE_CASE.SEARCH_SECTOR, filteredResults));
        },
        remove: (id) => {
            SectorService.remove(id).then(response => {
                Toast.show(response.messages);
                if (response.isValid) {
                    dispatch(remove(USE_CASE.SEARCH_SECTOR, id));
                }
            }).catch(error => {
                console.log('ERRO [components\\private\\sector\\search\\Search.js 92]');
            });
        },
        handlePageClick: (offset, reactContext) => {
            new Promise((resolve) => {
                resolve(dispatch(handlePageClick(USE_CASE.SEARCH_SECTOR, offset)));
            }).then(() => {
                reactContext.search();
            });
        },
        clearForm: () => {
            dispatch(clearForm(USE_CASE.SEARCH_SECTOR));
        },
        showModal: (id, e) => {
            dispatch(showModal(USE_CASE.SEARCH_SECTOR, id));
        },
        hideModal: () => {
            dispatch(hideModal(USE_CASE.SEARCH_SECTOR));
        }
    }
}
const SearchSectorContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchSectorContainer; 