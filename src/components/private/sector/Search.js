import React, { Component } from 'react'
import FooterPanel from '../../FooterPanel'
import Filters from './Filters'
import DataList from './DataList'
import SectorService from '../../../services/sector/SectorService'
import Toast from '../../../helpers/Toast'
import Paginator from '../Paginator'
import { PAGE_SIZE } from '../../../helpers/constants'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

class Search extends Component {

    constructor() {
        super();
        this.state = { filteredResults: [], offset: 0, pageCount: 0 }
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
        SectorService.listAll(this.state.offset).then(response => {
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

    clearForm(e) {
        e.preventDefault();
        this.setState({ filteredResults: [], offset: 0, pageCount: 0 });
    }

    handlePageClick(offset) {
        this.setState({ offset: offset }, () => {
            this.search();
        });
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
                            <Filters />
                            <FooterPanel submitRef={el => this.sendButton = el} clearForm={this.clearForm.bind(this)} label="Pesquisar" />
                            <DataList filteredResults={this.state.filteredResults} />
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

const SearchContainer = connect(null, mapDispatchToProps)(Search);

export default SearchContainer; 