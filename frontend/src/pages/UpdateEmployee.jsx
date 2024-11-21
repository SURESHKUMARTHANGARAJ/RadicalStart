import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Camera from '../components/UpdateEmployee/Camera'
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from '../Context/GlobalContext';
import Title from '../components/UpdateEmployee/Title';
import PersonalInfoSection from '../components/UpdateEmployee/PersonalInfoSection';
import EmployeeForm from '../components/UpdateEmployee/EmployeeForm';

const UpdateEmployee = () => {
  const { onSubmit,setUpdateId,isOpen } = useContext(GlobalContext);
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`);
        if (response.ok) {
          const jsonData = await response.json();
          const data = jsonData.data;

          setValue('id', data.id);
          setValue('name', data.name);
          setValue('department', data.department);
          setValue('designation', data.designation);
          setValue('project', data.project);
          setValue('type', data.type);
          setValue('status', data.status);
          setUpdateId(id);
          if (data.image) {
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
  }, [id, setValue,setUpdateId]);

  const handleFileChange = (file) => {
    setValue('file', file ? [file] : [], { shouldValidate: true });
  };

  const handleCancel = () => {
    reset();
    setPreview(null);
  };

  return (
    <div className={isOpen?"grid-container active":"grid-container"}>
      <Nav />
      <Sidebar />
      <main id="AddEmployee">
        <Title label={"Edit Employee Details"}/>
        <form onSubmit={handleSubmit(onSubmit)}>
           <PersonalInfoSection />
          <div className="row">
            <Camera onFileChange={handleFileChange} preview={preview} setPreview={setPreview}/>
            <EmployeeForm handleCancel={handleCancel} register={register} errors={errors}/>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateEmployee;
