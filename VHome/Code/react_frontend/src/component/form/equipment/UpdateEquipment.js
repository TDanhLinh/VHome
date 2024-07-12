import * as React from "react";
import {useContext, useEffect, useState} from "react";
import { Button, Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {editAPI, showAPI} from "../../api/axios"
import * as Yup from 'yup'
import {DataTableContext} from "../../TableContext";

export default function UpdateEquipment(props) {
    const {setOpen, id, functionName} = props;
    const {setDataChange} = useContext(DataTableContext);
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

    const [errors, setErrors] = useState({}); // State to store validation errors

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên hàng"),
        quantity: Yup.string().required("Vui lòng nhập số lượng"),
        price: Yup.string().required("Vui lòng nhập giá tiền"),
        supplier: Yup.string().required("Vui lòng nhập Nhà cung cấp"),
        storage: Yup.string().required("Vui lòng nhập kho"),
        building: Yup.string().required("Vui lòng nhập tòa"),
        manufacture: Yup.number().required("Vui lòng nhập năm sản xuất")
            .min(1000, "Năm sản xuất phải từ 4 chữ số trở lên") // Minimum year (optional)
            .max(2500, "Năm sản xuất không được vượt quá 2500") // Maximum year (optional)
            .integer("Năm sản xuất phải là số nguyên"), // Ensure only whole numbers are entered
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEquipment(prevEquipment => ({...prevEquipment, [name]: value}));
    };

    const handleUpdate = async () => {
        setDataChange(false);
        try {
            await validationSchema.validate(equipment, {abortEarly: false}); // Validate all fields at once
            setErrors({}); // Clear any previous errors if validation passes
            console.table(equipment);
            if (equipment.id) {
                editAPI(functionName, equipment.id, equipment)
                    .then(response => {
                        if (response.status === 200) { // Check for successful status code (e.g., 200)
                            setDataChange(true);
                            setOpen(false);
                            alert("Lưu thành công");
                        } else {
                            console.error("Error updating equipment:", response.statusText);
                            alert("Lưu thất bại");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error); // Handle other errors
                        alert("Có lỗi xảy ra");
                    });
            }
        } catch (err) {
            // Set errors from Yup validation
            setErrors(err.inner.reduce((acc, error) => ({...acc, [error.path]: error.message}), {}));
        }
    };

    return (
        <Container fixed>
            <Grid container columnSpacing={3}>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic1" label="Tên hàng" variant="outlined"
                               name="name" value={equipment.name} onChange={handleChange} required
                               error={!!errors.name} // Set error prop if there's an error for this field
                               helperText={errors.name} // Display error message if it exists
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic4" label="Số lượng" variant="outlined"
                               name="quantity" value={equipment.quantity} onChange={handleChange} required
                               error={!!errors.quantity} helperText={errors.quantity} type="number"
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Tình trạng" variant="outlined"
                               name="status" value={equipment.status} onChange={handleChange}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic10" label="Nhà cung cấp"
                               variant="outlined" name="supplier" value={equipment.supplier} onChange={handleChange}
                               error={!!errors.supplier} helperText={errors.supplier} required
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Thương hiệu" variant="outlined"
                               name="brand" value={equipment.brand} onChange={handleChange}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic5" label="Giá tiền" variant="outlined"
                               name="price" value={equipment.price} onChange={handleChange} required
                               error={!!errors.price} helperText={errors.price} type="number"
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic11" label="Thời hạn bảo hành"
                               variant="outlined"
                               name="guarantee" value={equipment.guarantee} onChange={handleChange} required type="date"
                               error={!!errors.guarantee} helperText={errors.guarantee} InputLabelProps={{shrink: true}}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic12" label="Kho"
                               variant="outlined" name="storage" value={equipment.storage} onChange={handleChange}
                               error={!!errors.storage} helperText={errors.storage} required
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic3" label="Màu" variant="outlined"
                               name="color" value={equipment.color} onChange={handleChange}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic6" label="Năm sản xuất" variant="outlined"
                               name="manufacture" value={equipment.manufacture} onChange={handleChange} type="number"
                               error={!!errors.manufacture} helperText={errors.manufacture}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic9" label="Tòa"
                               variant="outlined" name="building" value={equipment.building} onChange={handleChange}
                               error={!!errors.building} helperText={errors.building} required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic12" label="Ghi chú" multiline
                               variant="outlined" name="note" value={equipment.note} onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" color="success" onClick={() => handleUpdate()}>Lưu</Button>
                </Grid>
            </Grid>
        </Container>
    )
}