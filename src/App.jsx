import EditformContainer from "./components/EditformContainer";
import { useEffect, useReducer } from "react";
import "./App.css";


const reducer = (state, action) => {
  if (action.type === "UPDATE_USERSDATA") {
    return {
      ...state,
      userData: action.payload,
    };
  }

  if (action.type === "LOADING") {
    return {
      ...state,
      isLoading: action.payload,
    };
  }

  if (action.type === "DELETE_USER") {
    const newdata = state.userData.filter(
      (eachdata) => eachdata.id !== action.payload
    );
    return {
      ...state,
      userData: newdata,
    };
  }

  if (action.type === "ONCLICK_EDIT") {
    return {
      ...state,
      isEditing: action.payload
    }
  }

  if (action.type === "UPDATE_NEW_USER") {
    const newUser = state.userData.map((eachItem) => {
      if (eachItem.id === action.payload.id) {
        return {
          id:action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          username: action.payload.userName
        }
      } else {
        return eachItem;
      }
    })
    return {
      ...state,
      userData: newUser
    }
  }
  return state;
};



function App() {

  const initialState = {
    userData: [],
    isLoading: false,
    isEditing: {
      status: false,
      id: "",
      name:"",
      email:"",
      username:"",
    },
    isError: {
      status: false,
      msg: "",
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsersData = async (apiURL) => {
    dispatch({ type: "LOADING", payload: true });
    dispatch({ type: "ERROR", payload: { status: false, msg: "" } });

    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      dispatch({ type: "UPDATE_USERSDATA", payload: data });
      dispatch({ type: "LOADING", payload: false });
      dispatch({ type: "ERROR", payload: { status: false, msg: "" } });
    } catch (error) {
      dispatch({ type: "LOADING", payload: false });
      dispatch({
        type: "ERROR",
        payload: {
          status: true,
          msg: error.message,
        },
      });
    }
  };

  useEffect(() => {
    fetchUsersData("https://jsonplaceholder.typicode.com/users");
  }, []);

  const handelDelete = (id) => {
    dispatch({ type: "DELETE_USER", payload: id, });
  };

  const handleEdit = (id, name, email, username) => {
    dispatch({
      type: "ONCLICK_EDIT",
      payload: {
        status: true, 
        id:id, 
        name:name, 
        email:email, 
        username:username
      }
    });
  };

  const updateData = (id, name, email, userName) => {
    dispatch({type: "UPDATE_NEW_USER", payload: {
      id:id, name:name, email:email, userName:userName
    }})
  }

  if (state.isLoading) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  }

  return (

    <center>
      <h1>Hello World this is Users Information</h1>

      {state.isEditing?.status && <EditformContainer id ={state.isEditing.id} coming_title={state.isEditing.name} coming_email={state.isEditing.email} coming_name={state.isEditing.username} updateData={updateData} /> }
      
      <hr></hr>

      {state.userData.map((eachUser) => {
        const { id, name, username, email } = eachUser;

        return (
          <div key={id}>
            <h3>{name}</h3>
            <h5 style={{ color: "grey" }}>{email}</h5>
            <h5 style={{ color: "green" }}>{username}</h5>
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
                onClick={() => handleEdit(id, name, email,username)
                }
              >
                Edit
              </button>
            </span>
            <hr></hr>
          </div>
        );
      })}
    </center>

  );
}

export default App;