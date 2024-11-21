import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { HiMiniUser } from "react-icons/hi2";
import Camera from '../components/Camera';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from '../Context/GlobalContext';

const UpdateEmployee = () => {
  const { onSubmit,setUpdateId } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="grid-container">
      <Nav />
      <Sidebar />
      <main id="AddEmployee">
        <div className="title">
          <IoIosArrowBack className="back-btn" onClick={() => navigate(-1)} />
          <h2>Edit Employee Details</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="personal">
            <HiMiniUser className='personal-icon'/>
            Personal Information
          </div>
          <div className="row">
            <Camera onFileChange={handleFileChange} preview={preview} setPreview={setPreview}/>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="name">Name <span>*</span></label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter name"
              />
              {errors.name && <p className='text-small text-danger'>{errors.name.message}</p>}
            </div>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="id">Employee ID <span>*</span></label>
              <input
                type="text"
                id="id"
                {...register('id', { required: 'Employee ID is required' })}
                placeholder="Enter ID"
                readOnly // Make the ID field read-only as it shouldn't be changed
              />
              {errors.id && <p className='text-small text-danger'>{errors.id.message}</p>}
            </div>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="department">Department <span>*</span></label>
              <select
                id="department"
                {...register('department', { required: 'Department is required' })}
              >
                <option value="">Select Department</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
              </select>
              {errors.department && <p className='text-small text-danger'>{errors.department.message}</p>}
            </div>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="designation">Designation <span>*</span></label>
              <select
                id="designation"
                {...register('designation', { required: 'Designation is required' })}
              >
                <option value="">Select Designation</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Software Designer">Software Designer</option>
                <option value="Tester">Tester</option>
              </select>
              {errors.designation && <p className='text-small text-danger'>{errors.designation.message}</p>}
            </div>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="project">Project <span>*</span></label>
              <input
                type="text"
                id="project"
                {...register('project', { required: 'Project is required' })}
                placeholder="Enter project"
              />
              {errors.project && <p className='text-small text-danger'>{errors.project.message}</p>}
            </div>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="type">Type <span>*</span></label>
              <select
                id="type"
                {...register('type', { required: 'Type is required' })}
              >
                <option value="">Select Type</option>
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.type && <p className='text-small text-danger'>{errors.type.message}</p>}
            </div>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="status">Status <span>*</span></label>
              <select
                id="status"
                {...register('status', { required: 'Status is required' })}
              >
                <option value="">Select Status</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
                <option value="Intern">Intern</option>
              </select>
              {errors.status && <p className='text-small text-danger'>{errors.status.message}</p>}
            </div>
          </div>
          <div className="button-group">
            <button type="button" className="cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit">
              Update
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateEmployee;
