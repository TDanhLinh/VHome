import * as React from "react";
import {useContext, useState} from "react";
import {Autocomplete, Button, Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {addAPI} from "../../api/axios"
import * as Yup from 'yup'
import {DataTableContext} from "../../TableContext";

export default function AddNewCustomer(props) {
    const {setOpen, functionName} = props;
    const {setDataChange} = useContext(DataTableContext);
    const [customer, setCustomer] = useState({
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

    const [errors, setErrors] = useState({}); // State to store validation errors
    const sexOptions = ["Nam", "Nữ", "Khác"];

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập họ và tên"),
        email: Yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
        phoneNumber: Yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ"),
        birth: Yup.date().required("Vui lòng chọn ngày sinh"),
        room: Yup.string().required("Vui lòng nhập phòng"),
        building: Yup.string().required("Vui lòng nhập tòa"),
        homeTown: Yup.string().required("Vui lòng nhập quê quán"),
        sex: Yup.string().required("Vui lòng chọn giới tính"),
        cccd: Yup.string()
            .required("Vui lòng nhập CCCD")
            .length(12, "CCCD phải có đúng 12 số"), // Add CCCD length validation
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        // Handle TextFields
        if (event.target.type !== "select-one") { // Check if it's not a select element (Autocomplete)
            setCustomer(prevCustomer => ({...prevCustomer, [name]: value}));
        } else { // Handle Autocomplete
            setCustomer(prevCustomer => ({...prevCustomer, sex: value})); // Update sex specifically
        }
    };

    const handleAdd = async () => {
        setDataChange(false);
        try {
            await validationSchema.validate(customer, {abortEarly: false}); // Validate all fields at once
            setErrors({}); // Clear any previous errors if validation passes
            console.table(customer);
            addAPI(functionName, customer)
                .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        setDataChange(true);
                        alert("Thêm khách hàng mới thành công");
                        setOpen(false);
                    } else {
                        console.error("Error updating customer:", response.statusText);
                        alert("Thêm khách hàng mới thất bại");
                        setOpen(false);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Có lỗi xảy ra");
                    setOpen(false);
                });
        } catch (err) {
            // Set errors from Yup validation
            setErrors(err.inner.reduce((acc, error) => ({...acc, [error.path]: error.message}), {}));
        }
    };

    return (
        <Container fixed>
            <Grid container rowSpacing={3} columnSpacing={3}>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic1" label="Họ và tên" variant="outlined"
                               name="name" value={customer.name} onChange={handleChange} required
                               error={!!errors.name} // Set error prop if there's an error for this field
                               helperText={errors.name} // Display error message if it exists
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Email" variant="outlined"
                               name="email" value={customer.email} onChange={handleChange}
                               error={!!errors.email} helperText={errors.email}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic3" label="Phòng" variant="outlined"
                               name="room" value={customer.room} onChange={handleChange} required
                               error={!!errors.room} helperText={errors.room}
                    />
                    <Autocomplete sx={{m: 1, width: "100%"}} options={sexOptions} value={customer.sex}
                                  onChange={(event, newValue) => {
                                      setCustomer({...customer, sex: newValue});
                                  }}
                                  renderInput={(params) => (
                                      <TextField {...params} id="outlined-basic4"
                                                 label="Giới tính" variant="outlined" name="sex"
                                                 error={!!errors.sex} helperText={errors.sex}
                                      />
                                  )}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic5" label="Quê quán" variant="outlined"
                               name="homeTown" value={customer.homeTown} onChange={handleChange}
                               error={!!errors.homeTown} helperText={errors.homeTown}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic6" label="Tài khoản ngân hàng"
                               variant="outlined" name="bankAccount" value={customer.bankAccount}
                               onChange={handleChange}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Người liên lạc" variant="outlined"
                               name="communicator" value={customer.communicator} onChange={handleChange}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic8" label="Số điện thoại" variant="outlined"
                               name="phoneNumber" value={customer.phoneNumber} onChange={handleChange} required
                               type="number"
                               error={!!errors.phoneNumber} helperText={errors.phoneNumber}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic9" label="Ngày sinh" variant="outlined"
                               name="birth" value={customer.birth} onChange={handleChange} type="date" required
                               error={!!errors.birth} helperText={errors.birth} InputLabelProps={{shrink: true}}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic10" label="Tòa" variant="outlined"
                               name="building" value={customer.building} onChange={handleChange} required
                               error={!!errors.building} helperText={errors.building}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic11" label="CCCD" variant="outlined"
                               name="cccd" value={customer.cccd} onChange={handleChange} required type="number"
                               error={!!errors.cccd} helperText={errors.cccd}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic12" label="Công việc" variant="outlined"
                               name="job" value={customer.job} onChange={handleChange}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic13" label="Ngân hàng" variant="outlined"
                               name="bank" value={customer.bank} onChange={handleChange}/>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic14" label="SĐT Người liên lạc"
                               variant="outlined" name="communicatorPhone"
                               value={customer.communicatorPhone} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" color="success" onClick={() => handleAdd()}>Lưu</Button>
                </Grid>
            </Grid>
        </Container>
    )
}