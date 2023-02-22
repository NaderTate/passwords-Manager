import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    Site: "",
    Email: "",
    Username: "",
    Pass: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
    try {
      await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
      setForm({ Site: "", Email: "", Username: "", Pass: "" });
      navigate("/");
    } catch (error) {
      window.alert(error);
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={onSubmit}>
        <div className="">
          <label htmlFor="Site">Site:</label>
          <input
            type="text"
            className=""
            id="Site"
            value={form.Site}
            onChange={(e) => updateForm({ Site: e.target.value })}
          />
        </div>
        <div className="">
          <label htmlFor="Email">Email</label>
          <input
            type="Email"
            className=""
            id="Email"
            value={form.Email}
            onChange={(e) => updateForm({ Email: e.target.value })}
          />
        </div>
        <div className="">
          <label htmlFor="Username">Username:</label>
          <input
            type="text"
            className=""
            id="Username"
            value={form.Username}
            onChange={(e) => updateForm({ Username: e.target.value })}
          />
        </div>

        <div className="">
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            className=""
            id="Password"
            value={form.Pass}
            onChange={(e) => updateForm({ Pass: e.target.value })}
          />
        </div>
        <div className="">
          <input type="submit" value="Create person" className="" />
        </div>
      </form>
    </div>
  );
}
