import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); 
        onLoginSuccess(); 
      } else {
        setErrorMsg(data.message || 'ログインに失敗しました');
      }
    } catch (error) {
      console.error('通信エラー:', error);
      setErrorMsg('通信エラーが発生しました');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名:</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
        </div>
        <div>
          <label>パスワード:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
