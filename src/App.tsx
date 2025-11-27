import { Route, Routes } from "react-router";
import Header from "./components/layout/Header/Header";
import Home from "./components/pages/Home/Home";
import Teachers from "./components/pages/Teachers/Teachers";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
