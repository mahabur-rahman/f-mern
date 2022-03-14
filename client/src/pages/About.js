import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import profilePic from "../images/own.jpg";
import womenPic from "../images/women.jpg";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      //  main data
      const data = await res.json();
      console.log(data);
      setUserData(data);

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
    callAboutPage();
  }, []);

  return (
    <>
      <section id="aboutUs" className="py-5">
        <div className="container d-flex justify-content-between">
          <form className="row" method="GET">
            <div className="col">
              <img
                src={userData.name === "Mahabur Rahman" ? profilePic : womenPic}
                width="200"
                height="100"
                alt="Profile"
              />
              <h4>{userData.name}</h4>
              <p>{userData.work}</p>
              <span>Ranking : 1/10</span>
              <div>
                <button className="btn btn-warning mt-2">Edit Profile</button>
              </div>
              <div className="mt-5">
                <a href="https://facebook.com" target="_blank">
                  Facebook
                </a>
                <br />
                <a href="https://youtube.com" target="_blank">
                  Youtube
                </a>
              </div>
            </div>
            {/* tabs */}

            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3 mt-4"
            >
              <Tab eventKey="about" title="About">
                <strong>User Id :</strong> {userData.id}
                <br />
                <strong>Name : </strong> {userData.name}
                <br />
                <strong>Email :</strong> {userData.email}
                <br />
                <strong>Phone : </strong>
                {userData.phone} <br />
                <strong>Profession : </strong> {userData.work}
              </Tab>
              <Tab eventKey="profile" title="Profile">
                Timeline here
              </Tab>
            </Tabs>
          </form>
        </div>
      </section>
    </>
  );
};

export default About;
