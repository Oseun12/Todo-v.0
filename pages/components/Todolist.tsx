import { useState } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

interface Todo {
    text: string;
    status: string;
}

const Todolist = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

    const addTodo = () => {
        if (newTodo.trim()) {
            const newTask = {
                text: newTodo,
                status: 'pending',
            };
            setTodos([...todos, newTask]);
            setNewTodo('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (editIndex > -1) {
                saveTodo();
            } else {
                addTodo();
            }
        }
    };

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

    const cancelEdit = () => {
        setNewTodo('');
        setEditIndex(-1);
    };

    const handleDeleteTodo = (index: number) => {
        setTodoToDelete(index);
        setIsModalOpen(true);
    };

    const confirmDeleteTodo = () => {
        if (todoToDelete !== null) {
            setTodos(todos.filter((_, i) => i !== todoToDelete));
            setTodoToDelete(null);
            setIsModalOpen(false);
        }
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
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter a new task..."
                        className="input input-bordered w-full max-w-xs text-black bg-white"
                    />
                    {editIndex > -1 ? (
                        <>
                            <button onClick={saveTodo} className="btn ml-2">
                                Save
                            </button>
                            <button onClick={cancelEdit} className="btn ml-2 btn-warning">
                                <FaTimes />
                            </button>
                        </>
                    ) : (
                        <button onClick={addTodo} className="btn ml-2">
                            Add
                        </button>
                    )}
                </div>
            </form>

            <div className="mb-4">
                <label className="label text-white">Filter by status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="select select-bordered text-black bg-white"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            {filteredTodos.length > 0 ? (
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
            ) : (
                <p>No item yet</p>
            )}

            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Delete</h3>
                        <p className="py-4">Are you sure you want to delete this task?</p>
                        <div className="modal-action">
                            <button onClick={confirmDeleteTodo} className="btn btn-error">
                                Yes, Delete
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="btn">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todolist;
