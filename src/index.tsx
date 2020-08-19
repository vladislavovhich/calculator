import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import {Provider} from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
import {library} from "@fortawesome/fontawesome-svg-core";
import {faCalculator} from "@fortawesome/free-solid-svg-icons";
import App from "./components/App"
import store from "./store/store"
import {BrowserRouter} from "react-router-dom";

library.add(faCalculator)

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorker.register();
