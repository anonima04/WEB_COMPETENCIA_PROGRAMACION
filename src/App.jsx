import HomePage from "./page/HomePage/HomePage";
import OurActivitiesPage from "./page/ourActivitiesPage/ourActivitiesPage";
import WhoWeArePage from "./page/whoWeArePage/whoWeArePage";
import OurTrajectoryPage from "./page/ourTrajectoryPage/ourTrajectoryPage";
import LoginPage from "./page/LoginPage/LoginPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        {/*Public routes*/}
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/¿quiénes-somos?" element={<WhoWeArePage/>}></Route>
        <Route path="/nuestra-trayectoria" element={<OurTrajectoryPage/>}></Route>
        <Route path="/nuestras-actividades" element={<OurActivitiesPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
      </Routes>
    
    </Router>
  );
}

export default App;
