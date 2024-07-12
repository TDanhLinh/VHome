import * as React from "react";
import {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {showAPI} from "../../api/axios";

export default function ShowServices(props) {
    const {id, functionName} = props;
    const [services, setServices] = useState({
        customerName: '',
        feeType: '',
        unitPrice: '',
        unit: '',
        recordDay: '',
        oldRecord: '',
        newRecord: '',
        price: '',
    });

    useEffect(() => {
        showAPI(functionName, id).then((response) => {
            setServices(response.data);
        }).catch(errors =>{
            console.log(errors);
        })
    }, [functionName, id]);

    return (
        <Container fixed>
            <Grid container rowSpacing={3} columnSpacing={3}>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic1" label="Khách hàng" variant="outlined"
                               name="customerName" value={services.customerName}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Đơn giá" variant="outlined"
                               name="unitPrice" value={services.unitPrice}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic3" label="Ngày chốt" variant="outlined"
                               name="recordDay" value={services.recordDay}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic4" label="Chỉ số cũ" variant="outlined"
                               name="oldRecord" value={services.oldRecord}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic6" label="Tên dịch vụ" variant="outlined"
                               name="feeType" value={services.feeType}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Đơn vị" variant="outlined"
                               name="unit" value={services.unit}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic8" label="Tổng tiền" variant="outlined"
                               name="price" value={services.price} type="number" disabled
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic5" label="Chỉ số mới" variant="outlined"
                               name="newRecord" value={services.newRecord}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}