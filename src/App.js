import React from "react";
import { Landing } from "./components/Landing";
import { Provider } from "react-redux";
import store from "./state/configStore";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
      <Landing/>
      </Provider>
    </React.Fragment>
  );
}

export default App;
