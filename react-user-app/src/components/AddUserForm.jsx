/**
 * @file AddUserForm.jsx
 * @version 1.0.0
 * @description
 *   This component renders a form to add a new user entry locally. It includes input fields
 *   for first name, last name, company name, role, and country. The form validates each field 
 *   before submission and prevents names from containing numbers. Users can add, clear, or cancel the form.
 *   Error messages are imported from a central constants file.
 * 
 * @component
 *   Props:
 *     - onAdd (function): Callback to handle user addition with validated form data.
 *     - onCancel (function): Callback to cancel the form entry and hide the form.
 * 
 * @author Harikrishnan R
 * @created 2025-05-11
 */

import React, { useState } from 'react';
import { ERROR_MESSAGES } from '../constants';

const AddUserForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: ERROR_MESSAGES.EMPTY,
    lastName: ERROR_MESSAGES.EMPTY,
    companyName: ERROR_MESSAGES.EMPTY,
    role: ERROR_MESSAGES.EMPTY,
    country: ERROR_MESSAGES.EMPTY,
  });

  const [formErrors, setFormErrors] = useState({});

  // Utility to check if string contains any number
  const hasNumber = (str) => /\d/.test(str);

  /**
   * Validates the form input fields.
   * @returns {boolean} true if valid, false otherwise.
   */
  const validate = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = ERROR_MESSAGES.firstNameRequired;
    } else if (hasNumber(formData.firstName)) {
      errors.firstName = ERROR_MESSAGES.firstNameContainsNumber;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = ERROR_MESSAGES.lastNameRequired;
    } else if (hasNumber(formData.lastName)) {
      errors.lastName = ERROR_MESSAGES.lastNameContainsNumber;
    }

    if (!formData.companyName.trim()) {
      errors.companyName = ERROR_MESSAGES.companyNameRequired;
    }

    if (!formData.role.trim()) {
      errors.role = ERROR_MESSAGES.roleRequired;
    }

    if (!formData.country.trim()) {
      errors.country = ERROR_MESSAGES.countryRequired;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles the form submission after validation.
   */
  const handleAdd = () => {
    if (!validate()) return;

    const { firstName, lastName, companyName, role, country } = formData;

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      company: { name: companyName, title: role },
      address: { country },
    };

    onAdd(newUser);

    // Reset form
    setFormData({
      firstName: ERROR_MESSAGES.EMPTY,
      lastName: ERROR_MESSAGES.EMPTY,
      companyName: ERROR_MESSAGES.EMPTY,
      role: ERROR_MESSAGES.EMPTY,
      country: ERROR_MESSAGES.EMPTY,
    });
    setFormErrors({});
  };

  /**
   * Updates the form state on input change.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: ERROR_MESSAGES.EMPTY });
  };

  /**
   * Clears all fields and validation errors.
   */
  const handleClear = () => {
    setFormData({
      firstName: ERROR_MESSAGES.EMPTY,
      lastName: ERROR_MESSAGES.EMPTY,
      companyName: ERROR_MESSAGES.EMPTY,
      role: ERROR_MESSAGES.EMPTY,
      country: ERROR_MESSAGES.EMPTY,
    });
    setFormErrors({});
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '8px',
      maxWidth: '500px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Add New User</h3>

      {/* First Name & Last Name */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={{ padding: '5px' }}
        />
        <div style={{ color: 'red' }}>{formErrors.firstName || formErrors.lastName}</div>
      </div>

      {/* Company & Role */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          style={{ padding: '5px' }}
        />
        <div style={{ color: 'red' }}>{formErrors.companyName || formErrors.role}</div>
      </div>

      {/* Country */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          style={{ padding: '5px', width: '300px' }}
        />
        <div style={{ color: 'red' }}>{formErrors.country}</div>
      </div>

      {/* Action Buttons */}
      <button onClick={handleAdd} style={{ marginRight: '10px' }}>Add</button>
      <button onClick={handleClear} style={{ marginRight: '10px' }}>Clear</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default AddUserForm;