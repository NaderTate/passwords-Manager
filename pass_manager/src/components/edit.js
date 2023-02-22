import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
export default function Edit() {
  const [form, setForm] = useState({
    Site: "",
    Email: "",
    Username: "",
    Pass: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://pass-manager-api.onrender.com/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      Site: form.Site,
      Email: form.Email,
      Username: form.Username,
      Pass: form.Pass,
    };

    // This will send a post request to update the data in the database.
    await fetch(`https://pass-manager-api.onrender.com/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
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
            type="text"
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
