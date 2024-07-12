/*
This is where the context is created to store labels and data for each table
*/
import {createContext} from "react";

const DataTableContext = createContext();
const LableTableContext = createContext();
const ElementTableContext = createContext();

export {DataTableContext, LableTableContext, ElementTableContext};