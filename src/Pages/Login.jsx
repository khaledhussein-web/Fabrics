import React from "react";

export default function Login({ t }) {
  return (
    <div>
      <h1>{t?.login?.title || "Login"}</h1>
      <p>{t?.login?.description || "Please log in to continue."}</p>
      {/* Add login form here */}
    </div>
  );
}