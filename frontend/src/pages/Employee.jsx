import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import Overlay from "../components/Employee/Overlay";
import { FiSearch } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import Table from "../components/Employee/Table";

const Employee = () => {
  const navigate = useNavigate();
  const { handleDeleteClick, searchInput, searchResult, handleSearchChange} =
    useContext(GlobalContext);
  

  return (
    <div className="grid-container">
      <Nav />
      <Sidebar />
      <main id="Employee">
        <div className="main-header">
          <h3 className="fw-bold">Employee</h3>
          <div className="right-box">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search form-control"
                placeholder="Search"
                value={searchInput} 
                onChange={handleSearchChange}
              />
            </div>
            <button onClick={() => navigate("/employee/add")}>
              <IoAddCircleOutline className="add-icon" />
              Add New Employee
            </button>
          </div>
        </div>
        <div className="table-outer">
          <div className="table table-responsive">
            <Table handleDeleteClick={handleDeleteClick} searchResult={searchResult} />
          </div>
        </div>
        <Overlay />
      </main>
    </div>
  );
};

export default Employee;
