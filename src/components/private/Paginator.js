import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import { PAGE_SIZE } from '../../helpers/constants'


export default class Paginator extends Component {

    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil(selected * PAGE_SIZE);
        this.props.handlePageClick(offset);
    };


    render() {

        const showPagination = this.props.resultsLength > 0 ? true : false;

        if (showPagination) {
            return (
                <div className="row center-align">
                    <ReactPaginate previousLabel={"Anterior"} nextLabel={"Próximo"}
                        pageCount={this.props.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick.bind(this)}
                        containerClassName={"pagination"}
                        activeClassName={"active"} />
                </div>)
        } else {
            return null;
        }

    }

}