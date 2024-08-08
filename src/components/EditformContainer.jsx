import React from "react";
import { useState } from "react";

const EditformContainer = ( { id, coming_title, coming_email, coming_name, updateData } ) => {

  const [title, setTitle] = useState(coming_title || "");
  const [email, setEmail] = useState(coming_email || "");
  const [name, setName] = useState(coming_name || "");

    return (
      <center>
        <form>
          <input
            type="text"
            id="title"
            className="input"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
          ></input>
          <input
            type="text"
            id="email"
            className="input"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          ></input>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          ></input>
          <button className="input" onClick={() => 
            updateData(id, title, email, name)
          }>
            Update data
          </button>
        </form>
      </center>
    )
  }

export default EditformContainer;
