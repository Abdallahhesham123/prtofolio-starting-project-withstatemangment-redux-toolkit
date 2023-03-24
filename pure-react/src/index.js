import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Provider } from "react-redux";
import {store} from "./State/index.js"
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import {persistStore} from "redux-persist";
const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)
root.render(

    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <App />
      </PersistGate>
    </Provider> 

);
