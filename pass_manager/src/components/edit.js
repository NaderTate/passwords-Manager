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

      setForm({
        Site: record[0].Site,
        Email: record[0].Email,
        Pass: record[0].Password,
        Username: record[0].Username,
      });
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
    <div className="flex flex-col justify-center mt-16 items-center">
      <h3>Update Record</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-3">
        <div className="">
          <input
            placeholder="Site"
            type="text"
            className="w-52 md:w-96 border rounded-md border-md"
            id="Site"
            value={form.Site}
            onChange={(e) => updateForm({ Site: e.target.value })}
          />
        </div>
        <div className="">
          <input
            placeholder="Email"
            type="text"
            className="w-52 md:w-96 border rounded-md border-md"
            id="Email"
            value={form.Email}
            onChange={(e) => updateForm({ Email: e.target.value })}
          />
        </div>
        <div className="">
          <input
            placeholder="Username"
            type="text"
            className="w-52 md:w-96 border rounded-md border-md"
            id="Username"
            value={form.Username}
            onChange={(e) => updateForm({ Username: e.target.value })}
          />
        </div>

        <div className="">
          <input
            placeholder="Password"
            type="text"
            className="w-52 md:w-96 border rounded-md border-md"
            id="Password"
            value={form.Pass}
            onChange={(e) => updateForm({ Pass: e.target.value })}
          />
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Update"
            className="bg-black text-white px-4 py-2 rounded-md"
          />
        </div>
      </form>
    </div>
  );
}
