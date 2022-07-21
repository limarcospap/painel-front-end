import React, { Component } from 'react';
import Navbar from './components/Navbar'
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'handsontable/dist/handsontable.full.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
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
            </section>
        );
    }
}
