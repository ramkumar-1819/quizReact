import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import './App.css';
import Home from './Component/HomeComponent/HomeComponent';
import Quiz from './Component/QuizComponent/Quiz'
function App() {
  return (<Router basename={window.location.pathname || ''>
    <Switch>
      <Route exact path="/">
           <Home></Home>
      </Route>
      <Route path="/quiz">
        <Quiz/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
