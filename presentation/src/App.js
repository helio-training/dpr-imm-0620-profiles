import React, { useState } from 'react';
import bcryptjs from 'bcryptjs';
import './App.css';
import { getEmail, setEmail, removeEmail, setLocalStorageValue } from './config/local';

const salt = bcryptjs.genSaltSync(12);

function App() {
  const [email, setStateEmail] = useState(getEmail());
  const [password, setPassword] = useState('');
  const [remind, setRemind] = useState(true);
  // console.log(password);

  const login = (event) => {
    event.preventDefault();
    console.log('remember', remind);
    if (remind) {
      // save email to Local Storage
      setEmail(email);
    } else {
      // remove email from Local Storage
      removeEmail();
    }
    // console.log(bcryptjs.hashSync(password, salt))
    const body = { email, password }
    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
        setLocalStorageValue('auth', response.headers.get('auth'));
        return response.json();
      })
      .then(data => console.log(data))
  }
  return (
    <div className="App">
      <form className="App-header" onSubmit={login}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={({ target }) => setStateEmail(target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
        <span className="block">
          <input name="remember"
            type="checkbox"
            checked={remind}
            onChange={() => setRemind(!remind)}
          />
          <label htmlFor="remember">
            Remember Me
          </label>
        </span>
        <input
          type="submit"
          value="Log In"
        />
      </form>
    </div>
  );
}

export default App;