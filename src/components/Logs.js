import React, { Component } from 'react';
import APIHelper from '../api'
import Modal from './Modal';
import router from '../router';
import Pagination from './Pagination'
import SelectOptions from './SelectOptions';
import Humanize from '../../node_modules/humanize-plus/dist/humanize.js';

export default class Logs extends Component {

    constructor(props) {
        super(props);
        this.limit = 20;
        this.categoriesOptions = [{value: 'DNS', label: 'DNS'}];
        this.statusOptions = [{value: 'valid', label: 'Valid'},
            {value: 'danger', label: 'Danger'},
            {value: 'pending', label: 'Pending'},
            {value: 'warning', label: 'Warning'},
            {value: 'processing', label: 'Processing'},
            {value: 'inconclusive', label: 'Inconclusive'}];
        if (this.props.match.params.data) {
            try {
                let data = JSON.parse(atob(this.props.match.params.data));
                this.state = {page: data['page'], logs: [], categories: data['categories'], status: data['status'],
                loading: true, total: 0, log: '', info: {}, modalLoading: false, modalError: false}
            } catch (e) {
                window.location.replace('/notFound');
            }
        } else {
            this.state = {page: 1, logs: [], categories: [], status: [], loading: true, total: 0, log: '', info: {},
                modalLoading: false, modalError: false}
        }
    }

    componentDidMount() {
        this.search(this.state.page)
    }

    onClick = () => {
        this.setState({loading: true}, () => {
            this.search(1);
        })
    };

    search = (page) => {
        let status = [];
        let categories = [];
        this.state.status.map(result => status.push(result.value));
        this.state.categories.map(result => categories.push(result.value));
        APIHelper.post('api/search-logs', {'skip': (page - 1) * this.limit, 'limit': this.limit,
            categories: categories, status: status})
                .then(response => this.setState({
                    logs: response['logs'], total: response['total'], loading: false, page: page}, () => {
                    this.props.history.push(router.logs(this.state.page, this.state.status, this.state.categories))
                }))
                .catch(() => this.setState({logs: [], total: 0, loading: false, page: 1}))
    };

    get = (log_id) => {
        this.setState({log: log_id, modalLoading: true}, () => {
            APIHelper.post('api/get-log', {'log_id': this.state.log})
                .then(response => this.setState({info: response, modalLoading: false, modalError: false}))
                .catch(() => this.setState({modalLoading: false, modalError: true}))
        })
    };

    renderFilters = () => {
        return (
            <div className="col-12 mb-2">
                <div className="row">
                    <div className="col-5">
                        <SelectOptions name="categories" label="Categories" value={this.state.categories} isMulti={true}
                                          options={this.categoriesOptions} onChange={
                                              (field, value) => this.setState({[field]: value})}>
                        </SelectOptions>
                    </div>
                    <div className="col-5">
                        <SelectOptions name="status" label="Status" value={this.state.status} isMulti={true}
                                          options={this.statusOptions} onChange={
                                              (field, value) => this.setState({[field]: value})}>
                        </SelectOptions>
                    </div>
                    <div className="col-2">
                    {this.state.loading ? <button className="btn btn-secondary button-adjust pull-right" disabled={true}>
                            <i className="fa fa-refresh fa-spin"/> Loading</button> :
                        <button className="btn btn-secondary button-adjust pull-right" onClick={this.onClick}>
                            <i className="fa fa-search"/> Searching</button>}
                    </div>
                </div>
            </div>
        )
    };

    getBadgeColor = (status) => {
        if (status === 'processing') {
            return 'dark'
        }
        if (status === 'inconclusive') {
            return 'secondary'
        }
        if (status === 'danger') {
            return 'danger'
        }
        if (status === 'pending') {
            return 'info'
        }
        if (status === 'valid') {
            return 'success'
        }
        return 'warning'
    };

    renderResults = () => {
        let parsedResults = [];
        this.state.logs.map(data => {
            parsedResults.push(
                <a href="javascript:void(0)" data-toggle="modal" data-target="#modalTarget" id={data['_id']}
                   onClick={value => this.get(value.currentTarget.id)}>
                    <div className="alert list-info">
                        {data['domain']}
                        <div className="pull-right">
                            <span className={"badge badge-" + this.getBadgeColor(data['status']) + " ml-2"}>{data['status']}</span>
                        </div>
                    </div>
                </a>)});
        return parsedResults
    };

    render() {
        return (
            <div className="row mb-3">
                <Modal id={this.state.log} loading={this.state.modalLoading} info={this.state.info}
                       error={this.state.modalError} categories={this.state.categories} status={this.state.status}
                       page={this.state.page}/>
                {this.renderFilters()}
                    <div className="col-12 mb-2">
                        <div className="row col-12 px-0 mx-0">
                            <div className="col-lg-5 px-0"><hr/></div>
                            <div className="col-lg-2 text-center">
                                <small>Found <strong>{Humanize.intComma(this.state.total)}
                                    </strong> result{this.state.total > 1 ? 's' : ''}
                                </small>
                            </div>
                            <div className="col-lg-5 px-0"><hr/></div>
                        </div>
                        {this.state.total > 0 ? this.renderResults() : null}
                        {this.state.total > this.limit ?
                            <Pagination page={this.state.page} total={this.state.total} limit={this.limit}
                                        onChange={page => this.search(page)}
                                        loading={this.state.loading}/> : null}
                    </div>
            </div>
        );
    }
}
