import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home';
import NotFound from './components/NotFound';
import router from './router'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Flows from './components/Flows';
import DefProtActions from './components/DefProtActions';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route path={router.home()} exact={true} component={Home} />
                <Route path={router.flows()} exact={true} component={Flows} />
                <Route path={router.defProtActions()} exact={true} component={DefProtActions} />
                <Route path="/*" component={NotFound} />
            </Switch>
        </App>
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
