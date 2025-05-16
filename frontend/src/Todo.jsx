import { useEffect, useState } from 'react';
import './styles.css';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';
import { InputTodo } from './components/InputTodo';

export const Todo = ({ onLogout }) => {
  const [todoText, setTodoText] = useState([])
  const [incompleteTodos, setIncompleteTodos] = useState([])
  const [completeTodos, setCompleteTodos] = useState([])
  const [error, setError] = useState(null);
  // ToDo一覧を取得
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/todos', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) 
          throw new Error('ToDoの取得に失敗しました');
        const data = await response.json();

        // ここで未完了・完了に分類
        const incomplete = data.filter((todo) => todo.completed === 0);
        const complete = data.filter((todo) => todo.completed === 1);

        setIncompleteTodos(incomplete);
        setCompleteTodos(complete);

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchTodos();
  }, []);


  const onChangeTodoText = (event) => setTodoText(event.target.value)

  const onClickAdd =  async () => {
    if (todoText === "") return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: todoText })
      });

      if (!response.ok) {
        throw new Error("ToDoの追加に失敗しました");
      }
  
      const newTodo = await response.json(); // ← サーバーが返す新しいToDo
      setIncompleteTodos([...incompleteTodos, newTodo]);
      setTodoText("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const onClickDelete = async (index) => {
    const targetTodo = incompleteTodos[index];
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:3001/todos/${targetTodo.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("ToDoの削除に失敗しました");
    }

    const newTodos = [...incompleteTodos]
    newTodos.splice(index, 1)
    setIncompleteTodos(newTodos)
  } catch (err) {
    console.error(err);
    setError(err.message);
  }
};

  const onClickComplete = async (index) => {
    const targetTodo = incompleteTodos[index];
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`http://localhost:3001/todos/${targetTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: targetTodo.title, completed: true }) // ← 完了に更新
      });
  
      if (!response.ok) {
        throw new Error('完了状態の更新に失敗しました');
      }
  
      // 更新成功 → 完了リストへ移動
      const updatedTodo = { ...targetTodo, completed: true };
      const newIncompleteTodos = [...incompleteTodos];
      newIncompleteTodos.splice(index, 1);
      setIncompleteTodos(newIncompleteTodos);
      setCompleteTodos([...completeTodos, updatedTodo]);
  
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const onClickBack = async (index) => {
    const targetTodo = completeTodos[index];
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://localhost:3001/todos/${targetTodo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: targetTodo.title, completed: false }) // ← 未完了に戻す
    });

    if (!response.ok) {
      throw new Error('状態を未完了に戻すのに失敗しました');
    }

    const updatedTodo = { ...targetTodo, completed: false };
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos([...incompleteTodos, updatedTodo]);

  } catch (err) {
    console.error(err);
    setError(err.message);
  }
};

  return (
    <>
    <div className="logout-container">
  <button onClick={onLogout} className="logout-button">
    ログアウト
  </button>
  </div>

   <InputTodo 
   todoText={todoText}
   onChange={onChangeTodoText}
   onClick={onClickAdd}
   />

   <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
   />

   <CompleteTodos 
   todos={completeTodos} 
   onClickBack={onClickBack} 
   />

{error && <p>エラー: {error}</p>}
    </>
  )
}