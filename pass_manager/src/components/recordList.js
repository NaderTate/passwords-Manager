import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Record = (props) => (
  <div className="flex ">
    <div className="flex flex-wrap justify-center items-center gap-x-5 ">
      <CopyToClipboard text={props.record.Site}>
        <span className="font-bold text-i text-indigo-800 capitalize">
          {props.record.Site}
        </span>
      </CopyToClipboard>
      <CopyToClipboard text={props.record.Email}>
        <span className="text-red-500 font-black tracking-wider hover:bg-black/50 rounded-md px-3 hover:text-white sm:w-auto w-[70vw] overflow-hidden">
          {props.record.Email}
        </span>
      </CopyToClipboard>
      <CopyToClipboard text={props.record.Username}>
        <span className="hover:bg-black/50 rounded-md px-3 hover:text-white">
          {props.record.Username}
        </span>
      </CopyToClipboard>
      <CopyToClipboard text={props.record.Password}>
        <span className="text-green-500 font-black tracking-wider hover:bg-black/50 rounded-md px-3 hover:text-white sm:w-auto w-[70vw] overflow-hidden">
          {props.record.Password}
        </span>
      </CopyToClipboard>
    </div>
    <div className="flex  items-center">
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </Link>
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const email = "nadertate@gmail.com";
  const password = "escapethematrix";
  const [isLogged, setIsLogged] = useState(false);
  const emailref = useRef(null);
  const passref = useRef(null);
  const submit = () => {
    if (
      emailref.current.value === email &&
      passref.current.value === password
    ) {
      setIsLogged(true);
    }
  };
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `https://pass-manager-api.onrender.com/record`
      );

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`https://pass-manager-api.onrender.com/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return (
      <div className="mt-5">
        {records.map((record) => {
          return (
            <div className="flex flex-col items-center">
              <Record
                record={record}
                deleteRecord={() => deleteRecord(record._id)}
                key={record._id}
              />
              <div className="bg-black w-screen h-[1px]"></div>
            </div>
          );
        })}
      </div>
    );
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      {isLogged ? (
        recordList()
      ) : (
        <div className="mt-10 w-[90vw] h-[90vh] flex flex-col items-center justify-center">
          <form action="" className="flex flex-col gap-3">
            <input
              type="email"
              ref={emailref}
              placeholder="email"
              className="w-52 md:w-96 border rounded-md border-md h-10"
            />
            <input
              type="password"
              ref={passref}
              placeholder="pass"
              className="w-52 md:w-96 border rounded-md border-md h-10"
            />
            <button
              type="submit"
              onClick={submit}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Enter
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
