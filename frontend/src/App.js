import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Calender from "./pages/Calender";
import Messages from "./pages/Messages";
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import ContextProvider from './Context/GlobalContext';

function App() {
  return (
    <ContextProvider>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/calender' element={<Calender />} />
      <Route path='/message' element={<Messages />} />
      <Route path='/employee' element={<Employee />} />
      <Route path='/employee/add' element={<AddEmployee />} />
      <Route path='/employee/:id' element={<UpdateEmployee />} />
      <Route path='/employee/view/:id' element={<ViewEmployee />} />
    </Routes>
    </ContextProvider>
  );
}

export default App;
