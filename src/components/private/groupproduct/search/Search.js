import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import GroupProductService from '../../../../services/groupproduct/GroupProductService'
import Toast from '../../../../helpers/Toast'
import Filters from '../../templatesearch/Filters'
import Paginator from '../../templatesearch/Paginator'
import DataList from '../../templatesearch/DataList'
import { PAGE_SIZE, URL , defaultFilters } from '../../../../helpers/constants'
import { PanelHeader, PanelFooter } from '../../../panels'
import { getObjectNewState, createInstance } from '../../../../helpers/jsonHelper'

class Search extends Component {

    constructor() {
        super();
        this.state = { filteredResults: [], offset: 0, pageCount: 0, nome: '' }
        this.sendButton = null;
        this.filters = defaultFilters;
    }

    componentDidMount() {
        this.search();
    }

    search(e) {

        if (e)
            e.preventDefault();

        this.sendButton.setAttribute("disabled", "disabled");
        this.props.showLoading();
        GroupProductService.list(this.state.offset, this.state.nome).then(response => {
            this.setState({ filteredResults: response.list.itens, offset: this.state.offset, pageCount: Math.ceil(response.list.qtdTotalItens / PAGE_SIZE) });
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

    remove(id, e) {

        e.preventDefault();

        if (confirm('Confirma a exclusão do setor?')) {

            this.props.showLoading();
            GroupProductService.remove(id).then(response => {
                if (response.isValid) {
                    Toast.show(response.messages);
                    const filtered = this.state.filteredResults.filter(item => item.id !== id);
                    const newState = createInstance(this.state);
                    newState.filteredResults = filtered;
                    this.setState(newState);
                }
            }).catch(error => {
                Toast.defaultError();
            }).then(() => {
                this.props.hideLoading();
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
                            <Filters handleInputChange={this.handleInputChange.bind(this)}  filters={this.filters} />
                            <PanelFooter submitRef={el => this.sendButton = el} newDetailUrl={URL.NEW_GROUP_PRODUCT} label="Pesquisar" />
                            <DataList filteredResults={this.state.filteredResults} remove={this.remove.bind(this)} editUrl={URL.GROUP_PRODUCT} />
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

const SearchGroupProductContainer = connect(null, mapDispatchToProps)(Search);

export default SearchGroupProductContainer;
