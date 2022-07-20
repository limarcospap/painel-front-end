import React, { Component } from 'react';
import Alert from 'react-s-alert';
import Navbar from './components/Navbar'
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <section>
                <Navbar/>
                <div className="p-4">
                    <div className="p-4 card card-body">
                        {this.props.children}
                    </div>
                </div>
                <Alert stack={{limit: 4}} html={true}/>
            </section>
        );
    }
}
