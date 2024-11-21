import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
  const [isOpen,setIsOpen] = useState(false);
  const [refreshKey,setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [updateId, setUpdateId] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [activeLink, setActiveLink] = useState("dashboard");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const handleToggle = ()=>{
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data.data);
          setSearchResult(data.data);
        } else {
          alert(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (err) {
        alert(`Error fetching data: ${err.message}`);
      }
    };

    fetchData();
  }, [refreshKey]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() !== "") {
      const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(value.toLowerCase().trim()) ||
        String(emp.id).trim().includes(value.trim())
      );
      setSearchResult(filteredEmployees);
    } else {
      setSearchResult(employees);
    }
  };

  // Function to handle the delete button click
  const handleDeleteClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowOverlay(true);
  };

  // Function to delete the employee
  const handleDelete = async () => {
    if (employeeToDelete !== null) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/employees/${employeeToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setEmployees(employees.filter((emp) => emp.id !== employeeToDelete));
          setSearchResult(employees.filter((emp) => emp.id !== employeeToDelete));
          setShowOverlay(false);
          setEmployeeToDelete(null);
          setRefreshKey(refreshKey+1);
        } else {
          alert(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (err) {
        alert(`Error deleting data: ${err.message}`);
      }
    }
  };

  // Handle form submission for updating an employee
  const onSubmit = async (data) => {
    const formPayload = new FormData();
    formPayload.append('id', data.id);
    formPayload.append('name', data.name);
    formPayload.append('department', data.department || '');
    formPayload.append('designation', data.designation || '');
    formPayload.append('project', data.project || '');
    formPayload.append('type', data.type || '');
    formPayload.append('status', data.status || '');

    if (data.file && data.file[0]) {
      formPayload.append('image', data.file[0]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${updateId}`, {
        method: 'PUT',
        body: formPayload,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to update employee'}`);
        return;
      }
      setRefreshKey(refreshKey+1);
      alert('Employee updated successfully!');
      navigate('/employee');
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  // Handle adding a new employee
  const handleAdd = async (data) => {
    const formPayload = new FormData();
    formPayload.append('id', data.id);
    formPayload.append('name', data.name);
    formPayload.append('department', data.department || '');
    formPayload.append('designation', data.designation || '');
    formPayload.append('project', data.project || '');
    formPayload.append('type', data.type || '');
    formPayload.append('status', data.status || '');

    if (data.file && data.file[0]) {
      formPayload.append('image', data.file[0]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        body: formPayload,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to add employee'}`);
        return;
      }
      setRefreshKey(refreshKey+1);
      alert('Employee added successfully!');
      navigate('/employee');
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleCancelDelete = () => {
    setEmployeeToDelete(null);
    setShowOverlay(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        employees,
        setEmployees,
        showOverlay,
        setShowOverlay,
        employeeToDelete,
        setEmployeeToDelete,
        handleCancelDelete,
        handleDeleteClick,
        updateId,
        setUpdateId,
        handleDelete,
        activeLink,
        setActiveLink,
        searchInput,
        setSearchInput,
        searchResult,
        setSearchResult,
        handleSearchChange,
        onSubmit,
        handleAdd,
        isOpen,
        handleToggle
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
