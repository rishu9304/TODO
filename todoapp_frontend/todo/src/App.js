import './App.css';
import Login from './Components/Login'
import Register from './Components/Register'
import Todo from './Components/Todo'
import Welcome from './Components/Welcome'
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
      	<Route path='/' exact component={Welcome} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/todo' exact component={Todo} />
      </Router>
    </div>
  );
}

export default App;
