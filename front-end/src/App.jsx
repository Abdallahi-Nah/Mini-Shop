import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PageWrapper from "./pages/pages_wrapper/PageWrapper";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <PageWrapper />
      </BrowserRouter>
    </>
  );
}

export default App;
