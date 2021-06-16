import './App.css';
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import Home from './Home';
import Form from './Form';
import Movements from './Movements';

function App() {
  return (
    <div className="App">
      <Router><Switch><Route path='/' exact><Home/></Route>
      <Route path='/form/:id?' exact><Form/></Route> {/* ? includes form/ and form/input:id */}
      <Route path='/movements' exact><Movements/></Route>
      </Switch></Router>
    </div>
  );
}

export default App;
