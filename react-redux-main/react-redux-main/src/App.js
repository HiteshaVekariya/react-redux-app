import React from "react";
import Front from "./components/Front";
import {I18nProvider} from "./intl";
import {useSelector} from "react-redux"

function App() {
  const lang = useSelector((state) => state.lang);
  return (
    <div className="App">
      <I18nProvider locale={lang}>
        <Front />
      </I18nProvider>
    </div>
  );
}

export default App;
