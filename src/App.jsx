import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentDetailsPage from "./pages/DepartmentDetailsPage";
import ServicesPage from "./pages/ServicesPage";
import PlansPage from "./pages/PlansPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLogin={() => (window.location.href = "/home")} />}
        />

        <Route path="/home" element={<HomePage />} />

        <Route path="/departements" element={<DepartmentsPage />} />

        <Route path="/departements/:slug" element={<DepartmentDetailsPage />} />

        <Route path="/services" element={<ServicesPage />} />

        <Route path="/plans-cours" element={<PlansPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;