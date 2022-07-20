import React, { Component } from 'react';
import APIHelper from '../api';
import router from '../router';
import Humanize from '../../node_modules/humanize-plus/dist/humanize.js';

export default class Modal extends Component {

    renderInfo = () => {
        let count = 0;
        let parsedResults = [];
        Object.entries(this.props.info).forEach(entry => {
            count += 1;
            let value = entry[1];
            let key = entry[0].replace('_', ' ');
            if (key.includes('Date')) value = new Date(value).toUTCString();
            parsedResults.push(
                <div className="row">
                    <div className="col-6"><small><strong>{Humanize.capitalize(key)}</strong></small></div>
                    <div className="col-6"><small>{value}</small></div>
                    {count === Object.keys(this.props.info).length ? null : <div className="col-12"><hr/></div>}
                </div>
            )
        });
        return parsedResults
    };

    finish = (status) => {
        APIHelper.post('api/finish-log', {'log_id': this.props.id, 'status': status})
                .then(() => window.location.replace(
                    router.logs(this.props.page, this.props.status, this.props.categories)))
    };

    render() {
        return (
            <div className="modal fade" id="modalTarget" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modalTitle">Log Details</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.loading ? <div className="text-center"><h5>
                                    <i className="fa fa-refresh fa-spin"/> Processing</h5></div> : (this.props.error ?
                                <div className="text-center"><h5>
                                    <i className="fa fa-times"/> Error while processing</h5></div> : this.renderInfo())}
                        </div>
                        <div className="modal-footer justify-content-center">
                            <div className="px-2">
                                <button type="button" disabled={this.props.loading} data-dismiss="modal"
                                        className="btn btn-danger-custom" onClick={
                                    () => this.finish('danger')}>Danger</button></div>
                            <div className="px-2">
                                <button type="button" disabled={this.props.loading} data-dismiss="modal"
                                        className="btn btn-secondary-custom" onClick={
                                    () => this.finish('inconclusive')}>Inconclusive</button></div>
                            <div className="px-2">
                                <button type="button" disabled={this.props.loading} data-dismiss="modal"
                                        className="btn btn-warning-custom" onClick={
                                    () => this.finish('warning')}>Warning</button></div>
                            <div className="px-2">
                                <button type="button" disabled={this.props.loading} data-dismiss="modal"
                                        className="btn btn-success-custom" onClick={
                                    () => this.finish('valid')}>Valid</button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
