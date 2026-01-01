// src/App.js
import './styles/theme.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import ReportFoundPage from './pages/ReportFoundPage';
import TrackReportPage from './pages/TrackReportPage';
import AllImagesPage from './pages/AllImagesPage';
import AlertsPage from './pages/AlertsPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import OTPPage from './pages/OTPPage';
import BookTicket from "./components/BookTicket"; 
import TicketConfirm from "./components/TicketConfirm";
import ExportDataPage from './pages/ExportDataPage';


function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/'; // OTP page

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<OTPPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/report-lost" element={<FormPage />} />
        <Route path="/report-found" element={<ReportFoundPage />} />
        <Route path="/book-ticket" element={<BookTicket />} />
        <Route path="/ticket-confirm" element={<TicketConfirm />} />
        <Route path="/track" element={<TrackReportPage />} />
        <Route path="/all-images" element={<AllImagesPage />} />
        <Route path="/report-lost" element={<FormPage />} />
        <Route path="/report-found" element={<ReportFoundPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/export-data" element={<ExportDataPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
