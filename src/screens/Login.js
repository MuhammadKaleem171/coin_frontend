import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Toast,
  ToastBody,
  ToastHeader,
  Badge,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api";

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedin, setLoggedin] = React.useState(false);

  const loginHandler = async (ev) => {
    ev.preventDefault();
    if (!email || !password) {
      return;
    }
    const data = {
      email,
      password,
    };

    await axiosInstance
      .post("login", data)
      .then(async (response) => {
        console.log("RESPONSE from login success ", response.result.token);
        window.localStorage.setItem("access_token", response.result.token);
        navigation("/home");
      })
      .catch((err) => {
        console.log("RESPONSE from login error ", err);
      });

    // console.log(username, password);
  };

  return (
    <div className="d-flex mx-auto w-50 justify-content-center align-items-center vh-100">
      <Container>
        <Row>
          <Col>
            <Card className="px-4 py-4">
              <h1 className="d-flex  justify-content-center align-items-center  w-100">
                <Badge>Coin IT</Badge>
              </h1>
              <CardBody>
                <Form onSubmit={loginHandler}>
                  <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="something@idk.cool"
                      onChange={(ev) => setEmail(ev.currentTarget.value)}
                    />
                  </FormGroup>
                  <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="don't tell!"
                      onChange={(ev) => setPassword(ev.currentTarget.value)}
                    />
                  </FormGroup>
                  <Button type="submit" color="primary">
                    Login
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
