import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClienteConsumidorService from '../../../../services/consumer/ClienteConsumidorService'
import Toast from '../../../../helpers/Toast'
import Filters from '../../templatesearch/Filters'
import Paginator from '../../templatesearch/Paginator'
import DataList from './DataList'
import { URL, defaultFilters, USE_CASE } from '../../../../helpers/constants'
import { PanelHeader, PanelFooter } from '../../../panels'
import { getObjectNewState } from '../../../../helpers/jsonHelper'
import { clearForm, list, handlePageClick, remove } from '../../../../actions/searchActionCreator'

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

        this.sendButton.setAttribute("disabled", "disabled");

        ClienteConsumidorService.list(this.props.searchState.offset, this.state.nome).then(response => {
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
        this.props.handlePageClick(offset, this);
    }


    handleInputChange(e) {
        const newState = getObjectNewState(e.target.name, e.target.value, this.state);
        this.setState(newState);
    }

    remove(id, e) {

        e.preventDefault();

        if (confirm('Confirma a exclusão do consumidor?')) {
            this.props.remove(id);
        }
    }

     

    render() {

        return (
            <div className="space-container">
                <div className="container">
                    <PanelHeader icon="perm_identity" label="Consumidor" />
                    <div className="panel">
                        <form onSubmit={this.search.bind(this)}>
                            <Filters handleInputChange={this.handleInputChange.bind(this)} filters={this.filters} />
                            <PanelFooter submitRef={el => this.sendButton = el} newDetailUrl={URL.NEW_CONSUMER} label="Pesquisar" />
                            <DataList filteredResults={this.props.searchState.filteredResults} remove={this.remove.bind(this)}  editUrl={URL.CONSUMER} />
                            <Paginator handlePageClick={this.handlePageClick.bind(this)} pageCount={this.props.searchState.pageCount} resultsLength={this.props.searchState.filteredResults.length} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return { searchState: state.searchConsumer }
}

const mapDispatchToProps = dispatch => {
    return {
        list: (filteredResults) => {
            dispatch(list(USE_CASE.SEARCH_CONSUMER, filteredResults));
        },
        remove: (id) => {
            ClienteConsumidorService.remove(id).then(response => {
                if (response.isValid) {
                    dispatch(remove(USE_CASE.SEARCH_CONSUMER, id));
                }
            }).catch(error => {
                Toast.defaultError();
            });

        },
        handlePageClick: (offset, reactContext) => {
            new Promise((resolve) => {
                resolve(dispatch(handlePageClick(USE_CASE.SEARCH_CONSUMER, offset)));
            }).then(() => {
                reactContext.search();
            });
        },
        clearForm: () => {
            dispatch(clearForm(USE_CASE.SEARCH_CONSUMER));
        }
    }
}
const SearchConsumerContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchConsumerContainer;

