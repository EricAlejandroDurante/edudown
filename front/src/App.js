//import { useRef } from "react";
import View from "./Components/PrincipalView";

import "./Components/CSS/Auxiliar.css";

function App() {
  const myStyle = {
    backgroundImage:
      "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
    height: "100vh",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  
  };
  return (<div className="Fondo"><View/></div>);
}

export default App;
