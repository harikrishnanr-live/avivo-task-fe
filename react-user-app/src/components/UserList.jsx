/**
 * @file UserList.jsx
 * @version 1.0.0
 * @description
 *   A presentational component that receives a list of users and displays them in a table format.
 *   Also provides a "Delete" action button to remove users from the list via local state.
 *   No interaction with API — purely visual and event-driven.
 *
 * @author harikrishnan
 * @created 2025-05-11
 */

import React from 'react';

/**
 * Renders a table of user data.
 *
 * @param {Object[]} users - List of user objects to be displayed.
 * @param {Function} onDeleteUser - Callback function to delete a user based on their ID.
 */
const UserList = ({ users, onDeleteUser }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Company</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Role</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Country</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {user.firstName} {user.lastName}
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {user.company.name}
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {user.company.title}
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {user.address.country}
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
              <button onClick={() => onDeleteUser(user.id)} style={{ color: 'red' }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;