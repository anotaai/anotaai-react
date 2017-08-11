import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PanelHeader, PanelFooter } from '../../../panels'
import Paginator from '../../templatesearch/Paginator'
import { URL, USE_CASE } from '../../../../helpers/constants'
import Filters from '../../templatesearch/Filters'
import Toast from '../../../../helpers/Toast'
import { getObjectNewState } from '../../../../helpers/jsonHelper'
import AppointmentBookService from '../../../../services/appointmentbook/AppointmentBookService'
import { clearForm, list, remove, handlePageClick, showModal, hideModal } from '../../../../actions/searchActionCreator'
import DataList from './DataList'


class Search extends Component {

    constructor() {
        super();
        this.sendButton = null;
        this.filters = [];
        this.state = {  };
    }

    search(e) {
        if (e)
            e.preventDefault();
    }

    remove() {

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
                    <PanelHeader icon="library_books" label="Caderneta" />
                    <div className="panel">
                        <form onSubmit={this.search.bind(this)}>
                            <Filters handleInputChange={this.handleInputChange.bind(this)} filters={this.filters} />
                            <PanelFooter submitRef={el => this.sendButton = el} newDetailUrl={URL.NEW_APPOINTMENT_BOOK} label="Pesquisar" />
                            <DataList filteredResults={this.props.searchState.filteredResults} editUrl={URL.APPOINTMENT_BOOK} remove={this.remove.bind(this)} showModal={this.props.showModal} hideModal={this.props.hideModal} showModalState={this.props.searchState.showModalState} text="Confirma a exclusão da caderneta?" />
                            <Paginator handlePageClick={this.handlePageClick.bind(this)} pageCount={this.props.searchState.pageCount} resultsLength={this.props.searchState.filteredResults.length} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { searchState: state.searchAppointmentBook }
}

const mapDispatchToProps = dispatch => {
    return {
        list: (filteredResults) => {
            dispatch(list(USE_CASE.SEARCH_APPOINTMENT_BOOK, filteredResults));
        },
        remove: (id) => {
            AppointmentBookService.remove(id).then(response => {
                Toast.show(response.messages);
                if (response.isValid) {
                    dispatch(remove(USE_CASE.SEARCH_APPOINTMENT_BOOK, id));
                }
            }).catch(error => {
                Toast.defaultError();
            });
        },
        handlePageClick: (offset, reactContext) => {
            new Promise((resolve) => {
                resolve(dispatch(handlePageClick(USE_CASE.SEARCH_APPOINTMENT_BOOK, offset)));
            }).then(() => {
                reactContext.search();
            });
        },
        clearForm: () => {
            dispatch(clearForm(USE_CASE.SEARCH_APPOINTMENT_BOOK));
        },
        showModal: (id, e) => {
            dispatch(showModal(USE_CASE.SEARCH_APPOINTMENT_BOOK, id));
        },
        hideModal: () => {
            dispatch(hideModal(USE_CASE.SEARCH_APPOINTMENT_BOOK));
        }
    }
}


const SearchAppointmentBookContainer = connect(mapStateToProps, mapDispatchToProps)(Search);
export default SearchAppointmentBookContainer;