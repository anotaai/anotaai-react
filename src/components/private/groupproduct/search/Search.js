import React, { Component } from 'react'
import { connect } from 'react-redux'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import Toast from '../../../../helpers/Toast'
import Filters from '../../templatesearch/Filters'
import Paginator from '../../templatesearch/Paginator'
import DataList from './DataList'
import { URL, defaultFilters , USE_CASE } from '../../../../helpers/constants'
import { PanelHeader, PanelFooter } from '../../../panels'
import { getObjectNewState } from '../../../../helpers/jsonHelper'
import { clearForm, list, remove } from '../../../../actions/searchActionCreator'

class Search extends Component {

    constructor() {
        super();
        this.sendButton = null;
        this.filters = defaultFilters;
        this.state = { nome: '' };
        this.offset = 0;
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

        this.sendButton.setAttribute("disabled", "disabled");
    
        GroupProductService.list(this.offset, this.state.nome).then(response => {
            this.props.list(response);
        }).catch(error => {
            Toast.defaultError();
        }).then(() => {
            if (this.sendButton !== undefined) {
                this.sendButton.removeAttribute("disabled");
            }
        });
    }

    handlePageClick(offset) {
        this.offset = offset;
        this.search();
    }


    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    remove(id, e) {

        e.preventDefault();

        if (confirm('Confirma a exclusão do setor?')) {

            GroupProductService.remove(id).then(response => {
                if (response.isValid) {
                    Toast.show(response.messages);
                    this.props.remove(id);
                }
            }).catch(error => {
                Toast.defaultError();
            });
        }
    }

    render() {

        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="business_center" label="Grupo de Produto" />
                    <div className="panel">
                        <form onSubmit={this.search.bind(this)}>
                            <Filters handleInputChange={this.handleInputChange.bind(this)} filters={this.filters} />
                            <PanelFooter submitRef={el => this.sendButton = el} newDetailUrl={URL.NEW_GROUP_PRODUCT} label="Pesquisar" />
                            <DataList filteredResults={this.props.searchState.filteredResults} remove={this.remove.bind(this)} editUrl={URL.GROUP_PRODUCT} />
                            <Paginator handlePageClick={this.handlePageClick.bind(this)} pageCount={this.props.searchState.pageCount} resultsLength={this.props.searchState.filteredResults.length} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { searchState: state.searchGroupProduct }
}

const mapDispatchToProps = dispatch => {
    return {
        list: (filteredResults) => {
            dispatch(list(USE_CASE.SEARCH_GROUP_PRODUCT,filteredResults));
        },
        remove: (id) => {
            dispatch(remove(USE_CASE.SEARCH_GROUP_PRODUCT,id));
        },
        clearForm: () => {
            dispatch(clearForm(USE_CASE.SEARCH_GROUP_PRODUCT));
        }
    }
}

const SearchGroupProductContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchGroupProductContainer;