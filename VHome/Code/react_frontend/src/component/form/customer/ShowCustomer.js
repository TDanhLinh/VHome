import * as React from "react";
import {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {showAPI} from "../../api/axios";

export default function ShowCustomer(props) {
    const {id, functionName} = props;
    const [customer, setCustomer] = useState({
        id: '',
        name: '',
        phoneNumber: '',
        email: '',
        birth: '',
        room: '',
        building: '',
        sex: '',
        cccd: '',
        homeTown: '',
        bankAccount: '',
        bank: '',
        job: '',
        communicator: '',
        communicatorPhone: ''
    });

    useEffect(() => {
        showAPI(functionName, id).then((response) => {
            setCustomer(response.data);
        }).catch(errors =>{
            console.log(errors);
        })
    }, [functionName, id]);

    return (
        <Container fixed>
            <Grid container rowSpacing={3} columnSpacing={3}>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Họ và tên" variant="outlined"
                               name="name" value={customer.name} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Email" variant="outlined"
                               name="email" value={customer.email} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Phòng" variant="outlined"
                               name="room" value={customer.room} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Giới tính" variant="outlined"
                               name="sex" value={customer.sex} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic-add5" label="Quê quán"
                               variant="outlined" name="homeTown" value={customer.homeTown}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Tài khoản ngân hàng" variant="outlined"
                               name="bankAccount" value={customer.bankAccount} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Người liên lạc" variant="outlined"
                               name="communicator" value={customer.communicator} />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Số điện thoại" variant="outlined"
                               name="phoneNumber" value={customer.phoneNumber} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Ngày sinh" variant="outlined"
                               name="birth" value={customer.birth} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Tòa" variant="outlined"
                               name="building" value={customer.building} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="CCCD" variant="outlined"
                               name="cccd" value={customer.cccd} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Công việc" variant="outlined"
                               name="job" value={customer.job} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="Ngân hàng" variant="outlined"
                               name="bank" value={customer.bank} />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic" label="SĐT Người liên lạc" variant="outlined"
                               name="communicatorPhone" value={customer.communicatorPhone} />
                </Grid>
            </Grid>
        </Container>
    )
}