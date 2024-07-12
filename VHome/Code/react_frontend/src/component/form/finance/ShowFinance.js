import * as React from "react";
import {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {showAPI} from "../../api/axios";

export default function ShowFinance(props) {
    const {id, functionName} = props;
    const [finance, setFinance] = useState({
        name: '',
        servicesName: '',
        createDay: '',
        customerName: '',
        room: '',
        building: '',
        term: '',
        money: '',
        paidMoney: '',
        status: '',
    });

    useEffect(() => {
        showAPI(functionName, id).then((response) => {
            setFinance(response.data);
        }).catch(errors => {
            console.log(errors);
        })
    }, [functionName, id]);

    return (
        <Container fixed>
            <Grid container columnSpacing={3}>
                <Grid item xs={12}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic1" label="Tên hóa đơn" variant="outlined"
                               name="name" value={finance.name}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Khách hàng" variant="outlined"
                               name="customerName" value={finance.customerName}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic3" label="Phòng" variant="outlined"
                               name="room" value={finance.room}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic4" label="Tòa" variant="outlined"
                               name="building" value={finance.building}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic5" label="Dịch vụ"
                               variant="outlined" name="servicesName" value={finance.servicesName}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Ngày tạo"
                               variant="outlined" name="createDay" value={finance.createDay}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Kỳ hạn"
                               variant="outlined" name="term" value={finance.term}/>
                </Grid>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Tiền cần trả" variant="outlined"
                               name="money" value={finance.money} type="number" disabled
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Tiền đã trả" variant="outlined"
                               name="paidMoney" value={finance.paidMoney} type="number"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Trạng thái" variant="outlined"
                               name="status" value={finance.status} disabled
                    />
                </Grid>
            </Grid>
        </Container>
    )
}