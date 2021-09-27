import React from 'react';
import {Route} from 'react-router-dom'
import Home from './pages/Home'
import AddDictionary from './pages/AddPage'
import { db } from './config/firebase';

function App() {
  React.useEffect(() => {
    console.log(db);
  })
  
  return (
    <>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/addDictionary" exact>
        <AddDictionary />
      </Route>
    </>
  );
}

export default App;

