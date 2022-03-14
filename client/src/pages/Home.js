import React, { useState, useEffect } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const homePage = async () => {
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
      setName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
      // history.push("/login");
    }
  };

  useEffect(() => {
    homePage();
  }, []);

  return (
    <>
      <div className="my-5 py-5 text-center">
        <h1 className="text-uppercase mt-5 pt-5">Welcome to home page</h1>
        <h1>{name}</h1>
        <h4 className="w-50 mx-auto">
          {show ? "Happy to see you back" : "We are the mern developer"}
        </h4>
      </div>
    </>
  );
};

export default Home;
