import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";
import "./Components/Pricing.css";
import "./Components/Card.css";
import "./Components/Button.css";
import "./Components/List.css";
import Card from "./Components/Card";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carat from "./Components/Carat";
import "./Components/Carat.css";
import "./FireBaseConfig/FireBaeConfig.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Pricing></Pricing>
      <Card></Card> */}

      <Router>
        <Routes>
          {/* <Route path="/" element={<Pricing />} /> */}
          <Route path="/" element={<Card />} />

          <Route path="/carat" element={<Carat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
