import React, { Component } from 'react';

export default class Pagination extends Component{

    onPageEvent = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            let page = parseInt(event.target.value || event.target.text);
            this.props.onChange(page)
        }
    };

    getRange = () => {
        let range = [];
        let currentPage = this.props.page;
        let totalPages = Math.ceil(parseInt(this.props.total) / this.props.limit);
        if (totalPages <= 5) return Array.from(Array(totalPages).keys()).map(page => page + 1);
        [1, 2, 3, 4, 5].forEach(page => {
            if (currentPage === 1 || currentPage === 2)range.push(page);
            else if (currentPage === totalPages || currentPage === totalPages - 1) range.push(totalPages - 5 + page);
            else range.push(currentPage - 3 + page);
        });
        return range;
    };

    render(){
        return (
            <nav>
                <ul className="pagination justify-content-center">
                    {this.getRange().map(page => {
                        let select = (page === this.props.page) ? 'page-item active' : 'page-item';
                        return(
                            <li key={page} className={select}>
                                <a href='javascript:void(0)' onClick={event => this.onPageEvent(event)}
                                   className={'page-link' + (this.props.loading ? ' disable-link' : '')}>{page}</a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}