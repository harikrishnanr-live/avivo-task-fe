/**
 * @file User.jsx
 * @version 1.0.0
 * @description
 *   Main container component for managing user data. It fetches user data from the API,
 *   handles search, user addition (local only), and deletion from local state.
 *   The user data is displayed in a table format through the UserList component.
 *   A form to add a new user is shown conditionally via the AddUserForm component.
 * 
 * @author harikrishnan
 * @created 2025-05-11
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUserForm from './AddUserForm';
import UserList from './UserList';
import { USERLISTING_ENDPOINT } from '../constants';

const User = () => {
  const [users, setUsers] = useState([]);           // Users currently displayed
  const [allUsers, setAllUsers] = useState([]);     // Master copy of all users (used for search)
  const [searchTerm, setSearchTerm] = useState(''); // Current search input
  const [showForm, setShowForm] = useState(false);  // Toggle for AddUserForm

  /**
   * Fetches user data from the API endpoint and initializes state.
   */
  const fetchUsers = async () => {
    try {
      const res = await axios.get(USERLISTING_ENDPOINT);
      setUsers(res.data.users);
      setAllUsers(res.data.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Handles search input and filters users based on the entered keyword.
   */
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = allUsers.filter(user =>
      [user.firstName, user.company.name, user.company.title, user.address.country]
        .some(field => field.toLowerCase().includes(term))
    );
    setUsers(filtered);
  };

  /**
   * Handles adding a new user locally and updates both displayed and master list.
   * @param {Object} newUser - New user object to be added.
   */
  const handleAddUser = (newUser) => {
    const updated = [newUser, ...users];
    setUsers(updated);
    setAllUsers(updated);
    setShowForm(false);
  };

  /**
   * Handles deletion of a user from the displayed and master list.
   * @param {number} id - ID of the user to delete.
   */
  const handleDeleteUser = (id) => {
    const updated = users.filter(user => user.id !== id);
    setUsers(updated);
    setAllUsers(updated);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User List</h1>

      {/* Search & Controls */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by name, company, role, country"
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '5px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={fetchUsers}>Refresh</button>
        <button onClick={() => setShowForm(!showForm)} style={{ marginLeft: '10px' }}>+</button>
      </div>

      {/* Add User Form */}
      {showForm && (
        <AddUserForm onAdd={handleAddUser} onCancel={() => setShowForm(false)} />
      )}

      {/* User List Table */}
      <UserList users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default User;