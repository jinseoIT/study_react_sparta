import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import AddDictionary from './pages/AddPage'
import Spinner from './components/Spinner'

function App() {
  const is_loaded = useSelector(state => state.word.is_loaded);

  return (
    <>
    <Switch>
      {is_loaded && <Spinner/>}
      <Route path="/" component={Home} exact />
      <Route path="/addDictionary" component={AddDictionary} />
    </Switch>
    </>
  );
}

export default App;

