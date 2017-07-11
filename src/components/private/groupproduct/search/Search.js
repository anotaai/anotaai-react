import React, { Component } from 'react'
import { connect } from 'react-redux'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import Toast from '../../../../helpers/Toast'
import Filters from '../../templatesearch/Filters'
import Paginator from '../../templatesearch/Paginator'
import DataList from './DataList'
import { URL, defaultFilters, USE_CASE } from '../../../../helpers/constants'
import { PanelHeader, PanelFooter } from '../../../panels'
import { getObjectNewState } from '../../../../helpers/jsonHelper'
import { clearForm, list, remove, handlePageClick, showModal, hideModal } from '../../../../actions/searchActionCreator'

class Search extends Component {

    constructor() {
        super();
        this.sendButton = null;
        this.filters = defaultFilters;
        this.state = { nome: '' };
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
            
        GroupProductService.list(this.props.searchState.offset, this.state.nome, this.sendButton).then(response => {
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

    remove() {
        this.props.remove(this.props.searchState.idRemove);
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
                            <DataList filteredResults={this.props.searchState.filteredResults} editUrl={URL.GROUP_PRODUCT} remove={this.remove.bind(this)} showModal={this.props.showModal} hideModal={this.props.hideModal} showModalState={this.props.searchState.showModalState} text="Confirma a exclusão do grupo de produto?" />
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
            dispatch(list(USE_CASE.SEARCH_GROUP_PRODUCT, filteredResults));
        },
        remove: (id) => {
            GroupProductService.remove(id).then(response => {
                if (response.isValid) {
                    dispatch(remove(USE_CASE.SEARCH_GROUP_PRODUCT, id));
                }
            }).catch(error => {
                Toast.defaultError();
            });
        },
        handlePageClick: (offset, reactContext) => {
            new Promise((resolve) => {
                resolve(dispatch(handlePageClick(USE_CASE.SEARCH_GROUP_PRODUCT, offset)));
            }).then(() => {
                reactContext.search();
            });
        },
        clearForm: () => {
            dispatch(clearForm(USE_CASE.SEARCH_GROUP_PRODUCT));
        },
        showModal: (id, e) => {
            dispatch(showModal(USE_CASE.SEARCH_GROUP_PRODUCT, id));
        },
        hideModal: () => {
            dispatch(hideModal(USE_CASE.SEARCH_GROUP_PRODUCT));
        }
    }
}
const SearchGroupProductContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchGroupProductContainer;