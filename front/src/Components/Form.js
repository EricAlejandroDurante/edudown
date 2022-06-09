import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import "./CSS/Login.css";
import PrincipalView from "./PrincipalView.js";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(1);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const SetView=(active)=>{
    setActive(active);
  }

  const ActiveView = () => {
    switch(active){
      case 1:
        return <PrincipalView/>;
      default:
        return <PrincipalView/>;
    };

  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Rut</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          className="Button"
          variant="primary"
          size="lg"
          onClick={() => {}}>
          Ingresar
        </Button>
      </Form>
    </div>
  );
}
//<Button className="Button" block="false" size="lg" type="submit" disabled={!validateForm()}>
