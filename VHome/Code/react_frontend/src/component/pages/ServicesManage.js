/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {listAllAPI} from "../api/axios";

const sampleLabel = ['MãDV', 'Khách hàng', 'Tên dịch vụ', 'Giá tiền', 'Đơn vị', 'Tổng tiền', 'Ngày chốt', 'Thao tác'];
const sampleElement = ['id', 'customerName', 'feeType', 'unitPrice', 'unit', 'price', 'recordDay'];

export default function ServicesManage() {
    const {setLabel} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm dịch vụ";
    const header = "Dịch vụ";
    const functionName = "services";

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

