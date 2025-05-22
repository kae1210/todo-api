import React, { useState } from 'react';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('登録が完了しました。ログインしてください。');
        setErrorMsg('');
        setUsername('');
        setPassword('');
        if (onRegisterSuccess) onRegisterSuccess();
      } else {
        setErrorMsg(data.message || '登録に失敗しました。');
        setSuccessMsg('');
      }
    } catch (error) {
      console.error('通信エラー:', error);
      setErrorMsg('通信エラーが発生しました。');
      setSuccessMsg('');
    }
  };

  return (
    <div>
      <h2>ユーザー登録</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名:</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
        </div>
        <div>
          <label>パスワード:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Register;
