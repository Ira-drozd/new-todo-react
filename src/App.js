import React, {useEffect} from 'react'
import TodoList from "./todo/TodoList"
import Context from "./context";
//import NewTodo from "./todo/NewTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const NewTodo = React.lazy(
    () => new Promise(resolve => {
        setTimeout(() =>
            resolve(import('./todo/NewTodo'),
                5000))
    }
))


function App() {
    const [todos, setTodos] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => setTimeout(() => {
                setTodos(todos)
                setLoading(false)
            }, 2000))
    }, [])

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed

            }
            return todo
        }))
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const newTodo = (title) => {
        setTodos(todos.concat([
            {
                id: Date.now(),
                title: title,
                completed: false
            }
        ]))
        // return todos
        //  console.log(title)
    }

    return (
        <Context.Provider value={{removeTodo, toggleTodo}}>
            <div className='wrapper'>
                <Modal/>
                <React.Suspense fallback={<Loader/>}>
                    <NewTodo onCreate={newTodo}/>
                </React.Suspense>

                <h1>My todo list</h1>
                {loading && <Loader/>}
                {todos.length ? <TodoList todos={todos}/>
                    : loading ? null : 'No todos!'}


            </div>
        </Context.Provider>
    );
}

/*onToggle={toggleTodo*/
export default App
