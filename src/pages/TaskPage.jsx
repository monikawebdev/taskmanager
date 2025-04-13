import React, { useState, useEffect } from 'react';
import { api } from '../axios/ApiAxios';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch tasks on component mount
  const getTasks = async () => {
    try {
      const response = await api.get('/api/task');
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  // Create or Update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      if (editTaskId) {
        // Update task
        const response = await api.put(`/api/task/${editTaskId}`, { title });
        setTasks(tasks.map((task) => (task._id === editTaskId ? response.data : task)));
        setSuccess('Task updated successfully');
        setEditTaskId(null);
      } else {
        // Create task
        const response = await api.post('/api/task', { title });
        setTasks([...tasks, response.data]);
        setSuccess('Task created successfully');
      }
      setTitle('');
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/task/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      setSuccess('Task deleted successfully');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  // Start editing task
  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setTitle(task.title);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditTaskId(null);
    setTitle('');
    setError('');
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>

        {/* Form for creating/updating tasks */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
              >
                {editTaskId ? 'Update Task' : 'Add Task'}
              </button>
              {editTaskId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Task list */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks available</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-800">{task.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}