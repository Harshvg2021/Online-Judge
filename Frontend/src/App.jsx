import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import Login from "./pages/Login";
import ProblemsList from "./pages/ProblemList";
import {Route,Routes} from 'react-router-dom'
import Problems from "./pages/Problems";
import Registration from "./pages/Registration";
import SubmissionsPage from "./pages/SubmissionsPage";
import { Button } from "@nextui-org/react";
import NavbarTop from "./components/Navbar";
import CodeEditor from "./pages/CodeEditor";
export default function App() {

  return (
    <>
      <NavbarTop/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/problems' element={<ProblemsList/>} />
        <Route path="/problems/:problemID" element={<Problems/>} />
        <Route path="/register" element={<Registration/>}></Route>
        <Route path="/submissions" element={<SubmissionsPage/>}></Route>
        <Route path="/test" element={<CodeEditor/>}></Route>
        <Route path="*" element={<Notfound/>}/> 
      </Routes>
      {/* <Test/> */ }
    </>
  );
}

