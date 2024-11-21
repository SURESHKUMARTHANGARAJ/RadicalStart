import React from "react";
import profile from "../../assets/image/profile.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Table = ({ searchResult, handleDeleteClick }) => {
    const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee Id</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Project</th>
          <th>Type</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((emp, index) => (
            <tr key={index}>
              <td>
                <img
                  src={
                    emp.image ? `http://localhost:5000/${emp.image}` : profile
                  }
                  alt={emp.name}
                />
                &nbsp; {emp.name}
              </td>
              <td>{emp.id}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>{emp.project}</td>
              <td>{emp.type}</td>
              <td>{emp.status}</td>
              <td className="action">
                <IoEyeOutline
                  title="View"
                  className="action-icon text-primary"
                  onClick={() => navigate(`/employee/view/${emp.id}`)}
                />
                <BiEditAlt
                  title="Edit"
                  className="action-icon text-success"
                  onClick={() => navigate(`/employee/${emp.id}`)}
                />
                <LuTrash2
                  title="Delete"
                  className="action-icon text-danger"
                  onClick={() => handleDeleteClick(emp.id)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center no-record">
              <h3 className="text-center">No Records Found</h3>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
