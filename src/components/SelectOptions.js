import React, {Component} from 'react';

export default class SelectOptions extends Component {

    onChange = (value) => {
        if (this.props.onChange) {
            this.props.onChange(this.props.name, value);
        }
    };

    render() {
        return (
            <div className="form-group">
                <label className="col-form-label text-right" htmlFor="tag">{this.props.label}</label>
                <div className="row">
                    <div className="col-12">
                    </div>
                    <div className="col">{this.props.children}</div>
                </div>
            </div>
        )
    }
}