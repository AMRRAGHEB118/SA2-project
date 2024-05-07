import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Users from './pages/Users';
import Requests from './pages/Requests';
import BusDestination from './pages/BusDestination';
import NotFound from './pages/NotFound';
import AppointmentAlert from './components/AppointmentAlert';
import { useSelector } from 'react-redux';

const App = () => {
  const errorAppointment = useSelector((state) => state.appointment.error)
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Appointments />} />
            <Route path="users" element={<Users />} />
            <Route path="requests" element={<Requests />} />
            <Route path="bus_destination" element={<BusDestination />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <AppointmentAlert  error={errorAppointment}/>
    </BrowserRouter>
  );
};


export default App;