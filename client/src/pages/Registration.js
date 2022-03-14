import React, { useState } from "react";

// react bootstrap
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  // get user typing data | handleChange
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // form submit
  const formSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      window.alert("Invalid Credential");
      console.log("Invalid Credential");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history.push("/login");
    }
  };

  return (
    <>
      <section id="register" className="py-5">
        <Container>
          <h3 className="text-center my-4 text-dark display-6 fw-bold">
            Sign Up
          </h3>
          <Row>
            <Col xl={10} className="mx-auto">
              <Row>
                <Col xl={6} className="mx-auto">
                  <Form method="POST">
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Control
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Control
                        type="number"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        placeholder="phone"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="work">
                      <Form.Control
                        type="text"
                        name="work"
                        value={user.work}
                        onChange={handleChange}
                        placeholder="work"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control
                        type="password"
                        name="password"
                        value={user.passrword}
                        onChange={handleChange}
                        placeholder="password"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cpassword">
                      <Form.Control
                        type="password"
                        name="cpassword"
                        value={user.cpassword}
                        onChange={handleChange}
                        placeholder="confirm password"
                      />
                    </Form.Group>
                    <div className="text-end">
                      <Link to="/login">I am already register</Link>
                    </div>

                    {/* submit btn */}
                    <div>
                      <input
                        type="submit"
                        value="Register"
                        className="btn btn-success"
                        onClick={formSubmit}
                      />
                    </div>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
