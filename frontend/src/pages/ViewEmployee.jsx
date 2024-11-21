import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { HiMiniUser } from "react-icons/hi2";
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import CameraPrev from '../components/CameraPrev';
import DetailView from '../components/DetailView';

const UpdateEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [employee,setEmployee] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`);
        if (response.ok) {
          const jsonData = await response.json();
          const data = jsonData.data;
          setEmployee(data);
          
          if(data.image){
            setPreview(`http://localhost:5000/${data.image}`);
          }
        } else {
          alert(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="grid-container">
      <Nav />
      <Sidebar />
      <main id="AddEmployee">
        <div className="title">
          <IoIosArrowBack className="back-btn" onClick={() => navigate(-1)} />
          <h2> View Employee Details</h2>
        </div>
        <div className="row view">
            <form>
            <div className="personal">
                <HiMiniUser className='personal-icon'/>
                Personal Information
            </div>
            </form>
            <CameraPrev preview={preview} />
            <DetailView label={'Name'} data={employee.name} />
            <DetailView label={'Employee ID'} data={employee.id} />
            <DetailView label={"Department"} data={employee.department} />
            <DetailView label={"Designation"} data={employee.designation} />
            <DetailView label={"Project"} data={employee.project} />
            <DetailView label={"Type"} data={employee.type} />
            <DetailView label={"Status"} data={employee.status} />
        </div>
      </main>
    </div>
  );
};

export default UpdateEmployee;
