/*
This is the main part to render the Web
*/
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Header from "./component/Header";
import {DataTableContext, ElementTableContext, LableTableContext} from "./component/TableContext";

export default function App() {
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);
  const [element, setElement] = useState([]);
  const [dataChange, setDataChange] = useState(false);

  return (
      // Use the Container component from react-bootstrap to create a fluid container for the web page
      <Container fluid>
        <LableTableContext.Provider value={{label, setLabel}}>
          <DataTableContext.Provider value={{data, setData, dataChange, setDataChange}}>
            <ElementTableContext.Provider value={{element, setElement}}>
              {/*Render the header*/}
              <Header/>
            </ElementTableContext.Provider>
          </DataTableContext.Provider>
        </LableTableContext.Provider>
      </Container>
  );
}
