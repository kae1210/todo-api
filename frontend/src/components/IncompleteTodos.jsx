export const IncompleteTodos = (props) => {
    const { todos, onClickComplete, onClickDelete } = props;
    return (
      <div className="incomplete-area">
        <p>未完了のTODO</p>
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id}>
              <div className="list-row">
                <p className="todo-item">{todo.title}</p>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  