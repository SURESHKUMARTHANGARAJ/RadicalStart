import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Camera from '../components/UpdateEmployee/Camera';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { GlobalContext } from '../Context/GlobalContext';
import Title from '../components/UpdateEmployee/Title';
import PersonalInfoSection from '../components/UpdateEmployee/PersonalInfoSection';
import AddForm from '../components/AddEmployee/AddForm';

const AddEmployee = () => {
  const {handleAdd,isOpen} = useContext(GlobalContext);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [preview, setPreview] = useState(null);


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
        <Title label={"Add New Employee"} />
        <form onSubmit={handleSubmit(handleAdd)}>
          <PersonalInfoSection />
          <div className="row">
            <Camera onFileChange={handleFileChange} preview={preview} setPreview={setPreview}/>
            <AddForm register={register} errors={errors}/>
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
