import './App.css';
import LifecycleEx from './LifecycleEx';
import React from "react";

function App() {
  const [is_cat, setIsCat] = React.useState(true);
  return (
    <div className="App">
      {is_cat ? <LifecycleEx /> : null}
      <button onClick={ () => {setIsCat(!is_cat)}}>바꾸기</button>
    </div>
  );
}

export default App;
