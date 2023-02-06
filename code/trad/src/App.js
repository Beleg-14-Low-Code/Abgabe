import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WelcomePage from "./pages/welcome-page";
/* import { useEffect } from "react";
import axios from "axios";
import { useState } from "react"; */

function App() {
  /* useEffect(() => {
    const fetchItem = async () => {
      //api request
      try {
        const res = await axios.get("http://localhost:8800/claim-item");
        console.log(res);
        setItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItem();
  }, []);

  const [itemArray, setItem] = useState([]); */

  const item = [
    {
      id: 0,
      name: "Vehicle_001",
      wert: "40000",
      marke: "Skoda",
      modell: "Fabia",
      beschreibung: "LHZ (Automatic), L4, 1.2L; DOHC; 4; DI; FFV (2015)",
    },
    {
      id: 1,
      name: "Vehicle_002",
      wert: "30000",
      marke: "VW",
      modell: "Polo",
      beschreibung: "LHZ (Automatic), L4, 1.2L; DOHC; 4; DI; FFV (2015)",
    },
  ];

  return <WelcomePage {...{ item }} />;
}

export default App;
