import React, {Component} from 'react';


export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <a className="navbar-brand" href="/">EBCyber-Def</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/logs">Logs</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="dropdownMenu"
                               data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user fa-2x"/>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-default"
                                 aria-labelledby="dropdownMenu">
                                <a className="dropdown-item" href="#">Sign In</a>
                                <a className="dropdown-item" href="#">Sign Up</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}