import Back from "./components/Back";
import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import Login from "./pages/Login";
import ProblemsList from "./pages/ProblemList";
import {Route,Routes} from 'react-router-dom'
import Problems from "./pages/Problems";
import Test from "./pages/Test";

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/problems' element={<ProblemsList/>} />
        <Route path="/problems/:problemID" element={<Problems/>} />
        <Route path="*" element={<Notfound/>}/> 
      </Routes>
      {/* <Test/> */ }
    </>
  );
}

export default App;
