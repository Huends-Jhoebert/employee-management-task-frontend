import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeesTable from "./components/EmployeesTable";
import NotFound from "./components/NotFound";
import ErrorPage from "./components/ErrorPage"; // Import ErrorPage component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeesTable />} />
        {/* Add other routes here */}

        {/* Catch-all route for 404 page */}
        <Route path="*" element={<NotFound />} />

        {/* Custom error page */}
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
