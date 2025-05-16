export const CompleteTodos = (props) => {
    const { todos, onClickBack } = props;
    return (
      <div className="complete-area">
        <p>完了のTODO</p>
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id}>
              <div className="list-row">
                <p className="todo-item">{todo.title}</p>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  