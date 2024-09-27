import React, {useState} from "react";
import bulma from 'bulma';
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credential, setCredential]= useState({ username: 'Lambda School', password: 'i<3Lambd4'});
    const [logged, setLogged]= useState(false);

  const login = e => {
      e.preventDefault();
      setLogged(true);

      axiosWithAuth()
        .post('/login', credential)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            setLogged(false);
            props.history.push('/colors');
        })
        .catch(err => console.log(err));
  };

  const handleChange = e => {
    setCredential({
        ...credential, 
        [e.target.name]: e.target.value
    });
};
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
        {logged && <p>Getting Colored</p>}
      <form className='column is-half is-centered'   onSubmit={login}>
          <input className='input is-focused is-one-fourth is-centered '
            type="text"
            name="username"
            placeholder= "username"
            value={credential.username}
            onChange={handleChange}
          />
          <input className='input is-focused is-one-fourth is-centered '
            type="password"
            name="password"
            placeholder="password"
            value={credential.password}
            onChange={handleChange}
          />
          <button className='button is-success is-large'>Log in</button>
        </form>
    </div>
  );
};

export default Login;
