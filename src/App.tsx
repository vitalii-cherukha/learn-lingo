import { Route, Routes } from "react-router";
import Header from "./components/layout/Header/Header";
import Home from "./components/pages/Home/Home";
import Catalog from "./components/pages/Teachers/Teachers";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher" element={<Catalog />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
