import React, { useEffect, useRef, useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  id?: number;
  name: string;
  completed: boolean;
}
const baseUrl = "http://52.202.16.112:82/api";
function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    if (taskInput.current?.value.length) {
      addTask(newTask);
      setNewTask("");
      taskInput.current?.focus();
    }
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, completed: false }];
    fetch(`${baseUrl}/ToDoItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        completed: false,
      }),
    });
    setTasks(newTasks);
  };

  const togglecompletedTask = (index: number, task: ITask): void => {
    const newTasks: ITask[] = [...tasks];
    fetch(`${baseUrl}/ToDoItems/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: task.id,
        name: task.name,
        completed: !task.completed,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
      });
  };

  const handleDelete = (index: number, id: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    fetch(`${baseUrl}/ToDoItems/${id}`, {
      method: "DELETE",
    }).then(() => setTasks(newTasks));
  };
  useEffect(() => {
    fetch(`${baseUrl}/ToDoItems`)
      .then((response) => response.json())
      .then((res) => {
        setTasks(res);
      });
  }, []);
  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div
              className="card"
              style={{ background: "#6098ea", color: "#fff" }}
            >
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    onChange={(event) => setNewTask(event.target.value)}
                    value={newTask}
                    className="form-control"
                    autoFocus
                    ref={taskInput}
                    placeholder="Add Task + Enter"
                  />
                </form>
                <ul style={{ marginTop: "20px" }}>
                  {tasks.map((task: ITask, index: number) => (
                    <li
                      key={index}
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ width: "100%", display: "table" }}>
                        <div style={{ display: "table-row" }}>
                          <div
                            style={{ width: "600px", display: "table-cell" }}
                          >
                            <span
                              onClick={() => togglecompletedTask(index, task)}
                              style={{ width: "300px", fontSize: "18px" }}
                            >
                              {task.name}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "table-cell",
                              verticalAlign: "center",
                            }}
                          >
                            <button
                              style={{ marginBottom: "10px" }}
                              onClick={() =>
                                handleDelete(index, Number(task.id))
                              }
                            >
                              Delete?
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
