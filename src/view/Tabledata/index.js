import React from "react";
import { Button, Table } from "react-bootstrap";
import openDatabase from "../../component/Db";
const Tabledata = (props) => {
  const {
    setGetAlldata,
    GetAlldata,
    getAlldata,
    setPhone,
    setLastName,
    setFirstName,
  } = props;

  React.useEffect(() => {
    getAlldata();
  }, [GetAlldata]);

  const deleteData = async (item) => {
    const idb = await openDatabase();
    const getdatattx = idb.transaction("product", "readwrite");
    const getAllobjectStore = getdatattx.objectStore("product");

    getAllobjectStore.delete(item.id);
  };

  const EditeData = (item) => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setPhone(item.phone);
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone no</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {GetAlldata &&
          GetAlldata.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.phone}</td>
                <td>
                  <Button variant="danger" onClick={() => deleteData(item)}>
                    Delete
                  </Button>
                  {/* <br></br> */}
                  <Button className="ms-4" onClick={() => EditeData(item)}>
                    Edite
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default Tabledata;
