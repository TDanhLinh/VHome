/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {listAllAPI} from "../api/axios";

const sampleLabel = ['MãKH', 'Họ và tên', 'SĐT', 'Ngày sinh', 'CCCD', 'Phòng', 'Tòa', 'Thao tác']; //
const sampleElement = ['id', 'name', 'phoneNumber', 'birth', 'cccd', 'room', 'building'];

export default function ListCustomers() {
    const {setLabel} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm khách hàng";
    const header = "Khách hàng";
    const functionName = "customer"

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

