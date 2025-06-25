import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaUser, FaUserShield, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import '../assets/adminpage.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(res.data);
        setFilteredUsers(res.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    const results = users.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(users.filter(u => u._id !== userId));
      } catch (err) {
        setError('Failed to delete user');
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <h2 className="admin-title">User Management</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="admin-toolbar">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <div className="users-table">
            <div className="table-header">
              <div className="header-cell">User</div>
              <div className="header-cell">Email</div>
              <div className="header-cell">Role</div>
              <div className="header-cell actions">Actions</div>
            </div>
            
            {filteredUsers.length > 0 ? (
              filteredUsers.map(userItem => (
                <div key={userItem._id} className="table-row">
                  <div className="table-cell">
                    <div className="user-info">
                      {userItem.role === 'manager' ? (
                        <FaUserShield className="user-icon manager" />
                      ) : (
                        <FaUser className="user-icon" />
                      )}
                      <span>{userItem.username}</span>
                    </div>
                  </div>
                  <div className="table-cell">{userItem.email}</div>
                  <div className="table-cell">
                    <span className={`role-badge ${userItem.role}`}>
                      {userItem.role}
                    </span>
                  </div>
                  <div className="table-cell actions">
                    <button className="edit-btn">
                      <FaEdit />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(userItem._id)}
                      disabled={userItem._id === user._id}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                No users found matching your search
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;