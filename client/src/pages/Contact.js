import React, { useState, useEffect } from "react";
// react bootstrap
import { Container, Row, Col, Form } from "react-bootstrap";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callContactPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      //  main data
      const data = await res.json();
      console.log(data);
      // setUserData(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const err = new Error(res.error);
        throw err;
      }
    } catch (err) {
      console.log(err);
      // history.push("/login");
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  // storing data for input
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // send data to backend
  const formSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      bod: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();

    if (!data) {
      alert("Message not send");
    } else {
      alert("Message Send");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <section id="contact" className="py-5">
        <Container>
          <Row className="mb-3">
            <Col xl={4} className="border border-1">
              <h5>Phone</h5>
              <p>254252542</p>
            </Col>
            <Col xl={4} className="border border-1">
              <h5>Email</h5>
              <p>annur@gmail.com</p>
            </Col>
            <Col xl={4} className="border border-1">
              <h5>Address</h5>
              <p>Dhaka, Bangladesh</p>
            </Col>
          </Row>

          <Row>
            <Col xl={10} className="mx-auto">
              <Row>
                <h2 className="text-dark my-4 text-center">Get In Touch</h2>
                <Col xl={6} className="mx-auto">
                  <Form method="POST">
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Control
                        type="name"
                        id="name"
                        placeholder="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Control
                        type="number"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="phone"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                      <textarea
                        rows="5"
                        placeholder="message...."
                        className="form-control"
                        name="message"
                        value={userData.message}
                        onChange={handleChange}
                      ></textarea>
                    </Form.Group>

                    {/* submit btn */}
                    <div className="text-center">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={formSubmit}
                      >
                        Contact Now
                      </button>
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

export default Contact;
