import './App.css';
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import Home from './Components/Home';
import Form from './Components/Form';
import Movements from './Components/Movements';
import SideBar from './Components/SideBar';

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
