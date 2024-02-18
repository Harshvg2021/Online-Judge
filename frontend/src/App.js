import Back from "./components/Back";
import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import Login from "./pages/Login";
import ProblemsList from "./pages/ProblemList";
import {Route,Routes} from 'react-router-dom'
import Problems from "./pages/Problems";
import Test from "./pages/Test";
import Registration from "./pages/Registration";
import SubmissionsPage from "./pages/SubmissionsPage";

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/problems' element={<ProblemsList/>} />
        <Route path="/problems/:problemID" element={<Problems/>} />
        <Route path="/register" element={<Registration/>}></Route>
        <Route path="/submissions" element={<SubmissionsPage/>}></Route>
        <Route path="*" element={<Notfound/>}/> 
      </Routes>
      {/* <Test/> */ }
    </>
  );
}

export default App;
