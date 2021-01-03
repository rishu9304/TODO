import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

function Navbar(props){
  const auth = useSelector(state => state.auth);
  const [login,setLogin] = useState(false)
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['token']);

  // if(cookies['token']!==undefined && cookies['token']!=''){
  //   setLogin(true)
  // }
  const logout = () => {
    setCookie('token','')
    setLogin(false)
    localStorage.removeItem('username')
    window.location='/login'
  }

  useEffect(()=>{
    if(cookies['token']!==undefined && cookies['token']!=''){
      setLogin(false)
    }
    else{
      setLogin(true)
    }
  },[login])

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <a className="navbar-brand" href="#">Todo</a>
      {login?
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
      </ul>
      :<ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/register">{localStorage.getItem('username')}</a>
        </li>
        <li className="nav-item">
          <button className='btn btn-primary' onClick={logout}>logout</button>
        </li>
      </ul>}
    </nav>
    )
}

export default Navbar;