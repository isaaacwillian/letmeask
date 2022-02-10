import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
