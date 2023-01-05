import './App.css';
import React, { useState } from 'react';
const idb= window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
window.msIndexedDB;

//open your indexdb
const request =idb.open('test-db',2)


const createCollectionOfdDB=()=>{
  if(!idb){
    <div class="alert alert-danger" role="alert">
    this bowere don't support Indexdb
    </div>
  }

}
  request.onerror=(event)=>{
  alert('An error occured with Indexed',`${event.target.errorCode}`)
  console.log(event.target);
  }

  request.onupgradeneeded=()=>{
    const db = request.result;

    if (!db.objectStoreNames.contains("userData")) {
      const objectStore = db.createObjectStore("userData", { keyPath: "id" });
}
  }

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState({});


  const getAllData=()=>{
    const dbpromice=idb.open('test-db',2)
    dbpromice.onsuccess=()=>{
      const db=dbpromice.result
      const tx=db.transaction('userData','readonly')
      const userData=tx.objectStore('userData')
      const user=userData.getAll()
      user.onsuccess=(querry)=>{
        setAllUsers(querry.srcElement.result)
      }

      user.onerror=()=>{
alert('error')      }
      tx.oncomplete=()=>{
        db.close()
      }
    }
  }

  const handleSubmit =()=>{
    const dbpromice=idb.open('test-db',2)
    if(firstName&&lastName&&email){
      dbpromice.onsuccess=()=>{
        const db=dbpromice.result
        const tx=db.transaction('userData','readwrite')
        const userData=tx.objectStore('userData');
        if(addUser){

          const users=userData.put({
            id:allUsers.length+1,firstName,lastName,email
          })
          users.onsuccess=()=>{
            tx.oncomplete=()=>{
              db.close()
            }
            getAllData()
          }
        }
      }
    }
  }
const deleteSelected =(user)=>{
  const dbpromice=idb.open('test-db',2)
  dbpromice.onsuccess=()=>{
    const db=dbpromice.result
    const tx=db.transaction('userData','readwrite')
    const userData=tx.objectStore('userData');
    const deletedUser=userData.delete(user?.id)
    deletedUser.onsuccess=(querry)=>{
      alert('delete')
    }

    deletedUser.onerror=(querry)=>{
      alert('onerror')
    }
  }
}

  return (
    <div className="row" style={{ padding: 100 }}>
    <div className="col-md-6">
      <div>
        
        <button
          className="btn btn-primary float-end mb-2"
          onClick={() => {
            setFirstName("");
            setLastName("");
            setEmail("");
        
            setEditUser(false);
            setAddUser(true);
          }}
        >
          Add
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => {
            return (
              <tr key={user?.id}>
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.email}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setAddUser(false);
                      setEditUser(true);
                      setSelectedUser(user);
                      setEmail(user?.email);
                      setFirstName(user?.firstName);
                      setLastName(user?.lastName);
                    }}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteSelected(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="col-md-6">
      {editUser || addUser ? (
        <div className="card" style={{ padding: "20px" }}>
          <h3>{editUser ? "Update User" : "Add User"}</h3>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary mt-2"
              type="submit"
              onClick={handleSubmit}
            >
              {editUser ? "Update" : "Add"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  </div>
  );
}

export default App;
