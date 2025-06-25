import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../features/tasks/taskSlice';
import Navbar from '../components/Navbar';
import '../assets/dashboard.css';

const TASK_STATUS = {
  TODO: 'à faire',
  IN_PROGRESS: 'en cours',
  DONE: 'terminée'
};

function Dashboard() {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    assignedTo: '' 
  });
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    if (user.role === 'manager') fetchUsers();
  }, [user]);

  const filteredTasks = filter
    ? tasks.filter((task) => task.status === filter)
    : tasks;
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(newTask))
      .unwrap()
      .then(() => {
        setNewTask({ title: '', description: '', assignedTo: '' });
      })
      .catch((error) => {
        console.error('Failed to create task:', error);
      });
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: editTask._id, updates: editTask }))
      .unwrap()
      .then(() => {
        setEditTask(null);
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
      });
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h2 className="dashboard-welcome">Welcome, {user.username} ({user.role})</h2>
        {error && <div className="error-message">{error}</div>}

        {user.role === 'manager' && (
          <form onSubmit={handleSubmit} className="task-form">
            <h3>Create Task</h3>
            <input 
              name="title" 
              placeholder="Title" 
              value={newTask.title} 
              onChange={handleChange} 
              required 
            />
            <textarea
              name="description" 
              placeholder="Description" 
              value={newTask.description} 
              onChange={handleChange}
            />
            <select name="assignedTo" value={newTask.assignedTo} onChange={handleChange} required>
              <option value="">-- Choisir un utilisateur --</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>{u.username}</option>
              ))}
            </select>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </form>
        )}

        <div className="task-filter">
          <h3>Task List</h3>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            {Object.values(TASK_STATUS).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <ul className="task-list">
            {filteredTasks.map(task => (
              <li key={task._id} className={`task-item ${task.status.replace(/\s+/g, '-')}`}>
                <div className="task-header">
                  <strong>{task.title}</strong>
                  <span className={`task-status ${task.status.replace(/\s+/g, '-')}`}>
                    {task.status}
                  </span>
                </div>
                <div className="task-body">
                  {task.description && <p>{task.description}</p>}
                  <p>Assigned to: {task.assignedTo?.username || task.assignedTo}</p>
                </div>
                
                {(user.role === 'manager' || 
                  (task.assignedTo && task.assignedTo.username === user._id)) && (
                  <div className="task-actions">
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    {user.role === 'manager' && (
                      <button 
                        onClick={() => handleDelete(task._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {editTask && (
          <div className="edit-modal">
            <div className="modal-content">
              <form onSubmit={handleUpdate} className="task-form">
                <h3>Edit Task</h3>
                <input
                  name="title"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  required
                />
                <textarea
                  name="description"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                />
                <select
                  name="status"
                  value={editTask.status}
                  onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                >
                  {Object.entries(TASK_STATUS).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                  ))}
                </select>
                <div className="form-actions">
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setEditTask(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;