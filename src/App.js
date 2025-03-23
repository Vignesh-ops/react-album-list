import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AlbumDetails from "./pages/AlbumDetails";
import AlbumDataProvider from "./AlbumData/AlbumContext";



function App() {
  return (
    <AlbumDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collectionDetails/:id" element={<AlbumDetails />} />
        </Routes>
      </Router>
    </AlbumDataProvider>
  );
}

export default App;
