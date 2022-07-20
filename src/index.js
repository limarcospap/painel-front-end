import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home';
import Logs from './components/Logs';
import Teste from './components/Teste';
import NotFound from './components/NotFound';
import router from './router'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route path={router.home()} exact={true} component={Home} />
                <Route path={router.logs()} exact={true} component={Logs} />
                <Route path={router.teste()} exact={true} component={Teste} />
                <Route path="/*" component={NotFound} />
            </Switch>
        </App>
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
