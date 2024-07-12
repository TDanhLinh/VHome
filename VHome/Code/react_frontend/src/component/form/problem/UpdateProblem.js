import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {editAPI, showAPI} from "../../api/axios"
import * as Yup from 'yup'
import {DataTableContext} from "../../TableContext";

export default function UpdateProblem(props) {
    const {setOpen, id, functionName} = props;
    const {setDataChange} = useContext(DataTableContext);
    const [problem, setProblem] = useState({
        name: '',
        building: '',
        room: '',
        description: '',
        status: '',
        type: '',
        implementer: '',
        term: '',
    });

    useEffect(() => {
        showAPI(functionName, id).then((response) => {
            setProblem(response.data);
        }).catch(errors => {
            console.log(errors);
        })
    }, [functionName, id]);

    const [errors, setErrors] = useState({}); // State to store validation errors

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên sự cố"),
        building: Yup.string().required("Vui lòng nhập tòa xảy ra sự cố"),
        type: Yup.string().required("Vui lòng nhập loại sự cố"),
        implementer: Yup.string().required("Vui lòng nhập người chịu trách nhiệm xử lý"),
        term: Yup.date().required("Vui lòng chọn hạn hoàn thành"),
        status: Yup.string().required("Vui lòng nhập trạng thái")
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setProblem(prevProblem => ({...prevProblem, [name]: value}));
    };

    const handleUpdate = async () => {
        setDataChange(false);
        try {
            await validationSchema.validate(problem, {abortEarly: false}); // Validate all fields at once
            setErrors({}); // Clear any previous errors if validation passes
            console.table(problem);
            if (problem.id) {
                editAPI(functionName, problem.id, problem)
                    .then(response => {
                        if (response.status === 200) { // Check for successful status code (e.g., 200)
                            setDataChange(true);
                            setOpen(false);
                            alert("Lưu thành công");
                        } else {
                            console.error("Error updating problem:", response.statusText);
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
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic1" label="Tên sự cố" variant="outlined"
                               name="name" value={problem.name} onChange={handleChange} required
                               error={!!errors.name} // Set error prop if there's an error for this field
                               helperText={errors.name} // Display error message if it exists
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic4" label="Tòa" variant="outlined"
                               name="building" value={problem.building} onChange={handleChange} required
                               error={!!errors.building} helperText={errors.building}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Người xử lý" variant="outlined"
                               name="implementer" value={problem.implementer} onChange={handleChange}
                               error={!!errors.implementer} helperText={errors.implementer}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Trạng thái" variant="outlined"
                               name="status" value={problem.status} onChange={handleChange}
                               error={!!errors.status} helperText={errors.status}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic10" label="Loại sự cố"
                               variant="outlined" name="type" value={problem.type} onChange={handleChange}
                               error={!!errors.type} helperText={errors.type} required
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Phòng" variant="outlined"
                               name="room" value={problem.room} onChange={handleChange}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic5" label="Thời hạn" variant="outlined"
                               name="term" value={problem.term} onChange={handleChange} required
                               error={!!errors.term} helperText={errors.term} type="date"
                               InputLabelProps={{shrink: true}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic12" label="Mô tả" multiline
                               variant="outlined" name="description" value={problem.description} onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" color="success" onClick={() => handleUpdate()}>Lưu</Button>
                </Grid>
            </Grid>
        </Container>
    )
}