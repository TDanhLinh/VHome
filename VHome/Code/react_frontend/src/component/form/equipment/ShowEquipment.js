import * as React from "react";
import {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {showAPI} from "../../api/axios"

export default function ShowEquipment(props) {
    const {id, functionName} = props;
    const [equipment, setEquipment] = useState({
        name: '',
        brand: '',
        color: '',
        manufacture: '',
        price: '',
        quantity: '',
        status: '',
        guarantee: '',
        supplier: '',
        storage: '',
        building: '',
        note: ''
    });

    useEffect(() => {
        showAPI(functionName, id).then((response) => {
            setEquipment(response.data);
        }).catch(errors => {
            console.log(errors);
        })
    }, [functionName, id]);

    return (
        <Container fixed>
            <Grid container columnSpacing={3}>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic1" label="Tên hàng" variant="outlined"
                               name="name" value={equipment.name}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic4" label="Số lượng" variant="outlined"
                               name="quantity" value={equipment.quantity}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Tình trạng" variant="outlined"
                               name="status" value={equipment.status}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic10" label="Nhà cung cấp"
                               variant="outlined" name="supplier" value={equipment.supplier}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Thương hiệu" variant="outlined"
                               name="brand" value={equipment.brand}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic5" label="Giá tiền" variant="outlined"
                               name="price" value={equipment.price}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic11" label="Thời hạn bảo hành"
                               variant="outlined" InputLabelProps={{shrink: true}}
                               name="guarantee" value={equipment.guarantee}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic12" label="Kho"
                               variant="outlined" name="storage" value={equipment.storage}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic3" label="Màu" variant="outlined"
                               name="color" value={equipment.color}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic6" label="Năm sản xuất" variant="outlined"
                               name="manufacture" value={equipment.manufacture}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic9" label="Tòa"
                               variant="outlined" name="building" value={equipment.building}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic12" label="Ghi chú" multiline
                               variant="outlined" name="note" value={equipment.note}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}