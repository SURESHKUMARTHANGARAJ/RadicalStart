import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';

const AddForm = ({ register, errors }) => {
  
  const departmentOptions = [
    { value: 'Design', label: 'Design' },
    { value: 'Development', label: 'Development' },
    { value: 'Testing', label: 'Testing' },
  ];

  const designationOptions = [
    { value: 'Software Developer', label: 'Software Developer' },
    { value: 'Software Designer', label: 'Software Designer' },
    { value: 'Tester', label: 'Tester' },
  ];

  const typeOptions = [
    { value: 'Office', label: 'Office' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' },
  ];

  const statusOptions = [
    { value: 'Permanent', label: 'Permanent' },
    { value: 'Temporary', label: 'Temporary' },
    { value: 'Intern', label: 'Intern' },
  ];

  return (
    <>
      {/* Name Field */}
      <InputField
        id="name"
        label="Name"
        register={register}
        errors={errors}
        placeholder="Enter name"
        validation={{ required: 'Name is required' }}
      />

      {/* Employee ID Field */}
      <InputField
        id="id"
        label="Employee ID"
        register={register}
        errors={errors}
        placeholder="Enter ID"
        validation={{ required: 'Employee ID is required' }}
      />

      {/* Department Field */}
      <SelectField
        id="department"
        label="Department"
        register={register}
        errors={errors}
        options={departmentOptions}
        validation={{ required: 'Department is required' }}
      />

      {/* Designation Field */}
      <SelectField
        id="designation"
        label="Designation"
        register={register}
        errors={errors}
        options={designationOptions}
        validation={{ required: 'Designation is required' }}
      />

      {/* Project Field */}
      <InputField
        id="project"
        label="Project"
        register={register}
        errors={errors}
        placeholder="Enter project"
        validation={{ required: 'Project is required' }}
      />

      {/* Type Field */}
      <SelectField
        id="type"
        label="Type"
        register={register}
        errors={errors}
        options={typeOptions}
        validation={{ required: 'Type is required' }}
      />

      {/* Status Field */}
      <SelectField
        id="status"
        label="Status"
        register={register}
        errors={errors}
        options={statusOptions}
        validation={{ required: 'Status is required' }}
      />
    </>
  );
};

export default AddForm;
