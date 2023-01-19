import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import Tabledata from "./Tabledata";
import openDatabase from "../component/Db";
const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

const DataDB = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [GetAlldata, setGetAlldata] = React.useState("");

  const getAlldata = async () => {
    const idb = await openDatabase();
    const getdatattx = idb.transaction("product", "readonly");
    const getAllobjectStore = getdatattx.objectStore("product");
    const Getdata = getAllobjectStore.getAll();
    Getdata.onsuccess = (event) => {
      setGetAlldata(event.target.result);
    };
  };
  const handelsumit = async () => {
    const idb = await openDatabase();

    //let us onpe database
    const producttx = idb.transaction("product", "readwrite");
    const productStore = producttx.objectStore("product");
    if (firstName) {
      const temp = {
        id: GetAlldata.length + 1,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      };

      if (temp.firstName !== "") {
        productStore.put(temp);
        setFirstName("");
        setLastName("");
        setPhone("");
      }
    } else {
      alert("Filed all input filed");
    }
    getAlldata();
  };
  return (
    <>
      <Container className="pt-5 ">
        <Form className="pb-5 text-start">
          <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Label>Enter name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLast">
            <Form.Label>Enter Last</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Label>Enter Phone number</Form.Label>
            <Form.Control
              type="number"
              value={phone}
              placeholder="Enter Phone number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => {
              handelsumit();
            }}
          >
            Submit
          </Button>
        </Form>
        <Tabledata
          getAlldata={getAlldata}
          GetAlldata={GetAlldata}
          setGetAlldata={setGetAlldata}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setPhone={setPhone}
        />
      </Container>
    </>
  );
};

export default DataDB;
