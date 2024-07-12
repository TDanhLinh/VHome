/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {listAllAPI} from "../api/axios";

const sampleLabel = ['Mã', 'Tên sự cố', 'Loại sự cố', 'Người xử lý', 'Thời hạn', 'Trạng thái', 'Thao tác'];
const sampleElement = ['id', 'name', 'type', 'implementer', 'term', 'status'];

export default function ProblemManage() {
    const {setLabel} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm sự cố";
    const header = "Sự cố";
    const functionName = "problem";

    useEffect(() => {
        setLabel(sampleLabel);
        setElement(sampleElement);
        listAllAPI(functionName).then((response) => {
            setData(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [dataChange, setData, setElement, setLabel]);

    return (
        <div>
            <DisplayTable header={header} buttonTitle={buttonTitle} functionName={functionName}/>
        </div>
    )
}

