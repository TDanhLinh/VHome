/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {listAllAPI} from "../api/axios";

const sampleLabel = ['Mã', 'Tên hàng', 'Kho', 'Tòa', 'Tình trạng', 'Giá trị', 'Thao tác'];
const sampleElement = ['id', 'name', 'storage', 'building', 'status', 'price'];

export default function ListEquipments() {
    const {setLabel} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm hàng";
    const header = "Tài sản";
    const functionName = "equipment";

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

