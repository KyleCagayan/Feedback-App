import React from "react";
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";

export default function Post() {
  const status = 200;

  const navigate = useNavigate();

  // this is a redirect after updating something on the server.
  const onClick = () => {
    console.log("Hello");
    navigate("/about");
  };

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }

  return (
    <div>
      <h1>Post</h1>
      <button onClick={onClick}>Click</button>
      <Routes>
        <Route path="/show" element={<h1>Hello World</h1>} />
      </Routes>
    </div>
  );
}
