import { Route, Routes } from "react-router";
import Home from "./components/pages/Home/Home";
import Teachers from "./components/pages/Teachers/Teachers";
import NotFound from "./components/pages/NotFound/NotFound";
import Favorites from "./components/pages/Favorites/Favorites";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
