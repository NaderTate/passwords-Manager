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
      await fetch("https://pass-manager-api.onrender.com/record/add", {
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
    <div className="flex flex-col justify-center m-auto items-center">
      <h3>Create New</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-3">
        <div className="">
          <input
            placeholder="Site:"
            type="text"
            className="w-52 md:w-96 border rounded-md border-md"
            id="Site"
            value={form.Site}
            onChange={(e) => updateForm({ Site: e.target.value })}
          />
        </div>
        <div className="">
          <input
            placeholder="Email: "
            type="text"
            className="w-52 md:w-96 border rounded-md border-md"
            id="Email"
            value={form.Email}
            onChange={(e) => updateForm({ Email: e.target.value })}
          />
        </div>
        <div className="">
          <input
            placeholder="Username: "
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
            value="Add"
            className="bg-black text-white px-4 py-2 rounded-md"
          />
        </div>
      </form>
    </div>
  );
}
