import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { HiMiniUser } from "react-icons/hi2";
import Camera from '../components/Camera';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from '../Context/GlobalContext';

const AddEmployee = () => {
  const {handleAdd} = useContext(GlobalContext);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [preview, setPreview] = useState(null);


  const handleFileChange = (file) => {
    // Update the file field in the form
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
          <h2> Add New Employee</h2>
        </div>
        <form onSubmit={handleSubmit(handleAdd)}>
          <div className="personal">
            <HiMiniUser className='personal-icon'/>
            Personal Information
          </div>
          <div className="row">
            {/* Integrate the Camera component with react-hook-form */}
            <Camera onFileChange={handleFileChange} preview={preview} setPreview={setPreview}/>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="name">Name <span>*</span></label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter name"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="id">Employee ID <span>*</span></label>
              <input
                type="text"
                id="id"
                {...register('id', { required: 'Employee ID is required' })}
                placeholder="Enter ID"
              />
              {errors.id && <p>{errors.id.message}</p>}
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
              {errors.department && <p>{errors.department.message}</p>}
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
              {errors.designation && <p>{errors.designation.message}</p>}
            </div>
            <div className="col col-12 col-md-12 col-lg-6">
              <label htmlFor="project">Project <span>*</span></label>
              <input
                type="text"
                id="project"
                {...register('project', { required: 'Project is required' })}
                placeholder="Enter project"
              />
              {errors.project && <p>{errors.project.message}</p>}
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
              {errors.type && <p>{errors.type.message}</p>}
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
              {errors.status && <p>{errors.status.message}</p>}
            </div>
          </div>
          <div className="button-group">
            <button type="button" className="cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit">
              Confirm
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddEmployee;
