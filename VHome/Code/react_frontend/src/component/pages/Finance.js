/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {listAllAPI} from "../api/axios";

const sampleLabel = ['Mã', 'Tên hóa đơn', 'Khách hàng', 'Ngày tạo', 'Kỳ hạn', 'Tiền cần trả', 'Tiền đã trả', 'Trạng thái', 'Thao tác']; //
const sampleElement = ['id', 'name', 'customerName', 'createDay', 'term', 'money', 'paidMoney', 'status'];

export default function Finance() {
    const {setLabel} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm hóa đơn";
    const header = "Tài chính";
    const functionName = "finance";

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

