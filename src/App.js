import React, { useState, useEffect } from 'react';
import './App.css'; //

const Homepage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('dummy');
  const [password, setPassword] = useState('password');
  const [errors, setErrors] = useState({});
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=10'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch jokes');
      }
      const data = await response.json();
      setJokes(data.jokes);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Dummy authentication
      if (username === 'dummy' && password === 'password') {
        setLoggedIn(true);
      } else {
        alert('Invalid username or password');
      }
    }
  };

  return (
    <div className="container">
      {!loggedIn ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username && 'is-invalid'}`}
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <h2 className="text-center mt-4 mb-4">Jokes</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Joke</th>
                </tr>
              </thead>
              <tbody>
                {jokes.map((joke, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{joke.joke}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
