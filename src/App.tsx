import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorNotFound from "./components/ErrorNotFound";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import DashboardLayout from "./containers/DashboardLayout";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Routes>
        <Route path="" element={<PublicRoute redirectRoute={"/home"} />}>
          <Route path="/login" element={<Login />} />

          <Route index element={<Navigate replace to="/login" />} />
        </Route>

        <Route path="" element={<ProtectedRoute redirectRoute={"/login"} />}>
          <Route path="/*" element={<DashboardLayout />} />
        </Route>

        <Route path="*" element={<Navigate replace to="/login" />} />

        <Route element={<ErrorNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
