import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { persistor, store } from "./redux/store";
import "./assets/styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={<div />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
