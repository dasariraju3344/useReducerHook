import React, { useEffect, useReducer } from 'react';

const reducer = (state, action) => {

  if (action.type === "UPDATE_USERS_DATA") {
    return {
      ...state,
      usersData: action.payload
    }
  };

  if (action.type === "LOADING") {
    return {
      ...state,
      isLoading: action.payload
    }
  };

  if (action.type === "DELETE_USER") {
    const newUsersData = state.usersData.filter((eachItem) => {
      eachItem.id !== action.payload
    })
    return {
      ...state,
      usersData: newUsersData
    }
  };

  return state;
};

const Practice = () => {

  const fetchUsersData = async (URL) => {
    dispatch( {type: "LOADING", payload: true} );
    dispatch( {type: "ERROR", payload: {status: false, msg: ""}} );
    try {
      const response = await fetch(URL);
      const data = await response.json();
      dispatch( {type: "UPDATE_USERS_DATA", payload: data} )
      dispatch( {type: "LOADING", payload: false} );
      dispatch( {type: "ERROR", payload: {status: false, msg: ""}} );
    } catch (error) {
      dispatch( {type: "LOADING", payload: false} );
      dispatch( {type: "ERROR", payload: {status: true, msg: error.message}} )
    }
  }

  useEffect(() => {
    fetchUsersData("https://jsonplaceholder.typicode.com/users")
  }, [])

  const initialState = {
    usersData: [],
    isLoading: false,
    isError: {
      status: false,
      msg: ""
    }
  }

  const [finalState, dispatch] = useReducer(reducer, initialState);

  const handelDelete = (id) => {
    dispatch({type: "DELETE_USER", payload: id})
  };


  if (finalState.isLoading) {
    return(
       <h1>Loading...</h1>
    )
  }

  return (
    <center>
      <h1>User's Information</h1>
      <hr></hr>
      {
        finalState.usersData.map((eachUser) => {
          const {id, name, email, userName} = eachUser;
          <div key={id}>
            <h3>{name}</h3>
            <h5 style={{ color: "grey" }}>{email}</h5>
            <h3 style={{ color: "green" }}>{userName}</h3>
            <span className="buttons">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handelDelete(id);
                }}
              >
                Delete
              </button>
            </span>
            <span className="buttons">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handelEdit(id);
                }}
              >
                Edit
              </button>
            </span>
            <hr></hr>
          </div>
        })
      }
    </center>
  )
}

export default Practice;