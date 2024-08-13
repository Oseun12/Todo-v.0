import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Todo {
    text: string;
    status: string;
}

const Todolist = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [statusFilter, setStatusFilter] = useState('all');

    const addTodo = () => {
        if (newTodo.trim()) {
            const newTask = {
                text: newTodo,
                status: 'pending',
            };
            setTodos([...todos, newTask]);
            setNewTodo('');
        }
    }

    const editTodo = (index: number) => {
        setNewTodo(todos[index].text);
        setEditIndex(index);
    };

    const saveTodo = () => {
        if (editIndex > -1 && newTodo.trim()) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex].text = newTodo;
            setTodos(updatedTodos);
            setNewTodo('');
            setEditIndex(-1);
        }
    };

    const handleDeleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };
    
    const changeStatus = (index: number, status: string) => {
        const updatedTodos = [...todos];
        updatedTodos[index].status = status;
        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter((todo) => {
        if (statusFilter === 'all') return true;
        return todo.status === statusFilter;
    });

    return (
        <div className="p-4 bg-black text-white w-full">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new task..."
                    className="input input-bordered w-full max-w-xs text-black bg-white"
                />
                {editIndex > -1 ? (
                    <button onClick={saveTodo} className="btn ml-2">
                        Save
                    </button>
                ) : (
                    <button onClick={addTodo} className="btn ml-2">
                        Add
                    </button>
                )}
            </div>

            <div className="mb-4">
                <label className="label text-white">Filter by status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="select select-bordered text-black bg-white" // Explicit colors
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table text-white"> 
                    <thead>
                        <tr className="text-neutral-400">
                            <th>Task</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTodos.map((todo, index) => (
                            <tr key={index}>
                                <td className={`${todo.status === 'completed' ? 'line-through' : ''}`}>
                                    {todo.text}
                                </td>
                                <td>
                                    <select
                                        value={todo.status}
                                        onChange={(e) => changeStatus(index, e.target.value)}
                                        className="select select-bordered select-sm text-black bg-white" 
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="incomplete">Incomplete</option>
                                    </select>
                                </td>
                                <td className="flex items-center space-x-2">
                                    <button
                                        onClick={() => editTodo(index)}
                                        className="btn btn-sm btn-outline mr-2 p-1"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTodo(index)}
                                        className="btn btn-sm btn-outline btn-error p-1"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Todolist;
