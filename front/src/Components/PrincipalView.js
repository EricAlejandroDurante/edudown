import Formulario from "./Form";
import Card from "./CardComponent";
//import "./CSS/PrincipalView.css";
import Container from "./Container";
import Imagen from "./WebImg";
import Fondo from "./Fondo";



const PrincipalView = () => {
  return (
    
      <Container>
        <Card>
          <Imagen />
          <Formulario />
        </Card>
      </Container>
  );
};

export default PrincipalView;
