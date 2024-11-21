import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import CameraPrev from '../components/ViewEmployee/CameraPrev';
import DetailView from '../components/ViewEmployee/DetailView';
import PersonalInfoSection from '../components/UpdateEmployee/PersonalInfoSection';
import Title from '../components/UpdateEmployee/Title';
import { GlobalContext } from '../Context/GlobalContext';

const UpdateEmployee = () => {
  const {isOpen} = useContext(GlobalContext);
  const { id } = useParams(); 
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
    <div className={isOpen?"grid-container active":"grid-container"}>
      <Nav />
      <Sidebar />
      <main id="AddEmployee">
        <Title label={"View Employee Details"} />
        <div className="row view">
            <form>
            <PersonalInfoSection />
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
