    import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Autocomplete, Button, Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {editAPI, editAPIWithFile, listAllAPI, showAPI} from "../../api/axios"
import * as Yup from 'yup'
import {DataTableContext} from "../../TableContext";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export default function UpdateServices(props) {
    const {setOpen, id, functionName} = props;
    const {setDataChange} = useContext(DataTableContext);
    const [customer, setCustomer] = useState([]);
    const [services, setServices] = useState({
        customerId: '',
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
        listAllAPI("customer").then((response) => {
            setCustomer(response.data);
        }).catch(errors => {
            console.log(errors);
        })
        showAPI(functionName, id).then((response) => {
            setServices(response.data);
        }).catch(errors => {
            console.log(errors);
        })

    }, [functionName, id]);

    const [errors, setErrors] = useState({}); // State to store validation errors

    const validationSchema = Yup.object().shape({
        customerId: Yup.string().required("Vui lòng chọn khách hàng"),
        unitPrice: Yup.string().required("Vui lòng nhập đơn giá"),
        recordDay: Yup.date().required("Vui lòng chọn ngày chốt"),
        feeType: Yup.string().required("Vui lòng nhập tên dịch vụ"),
        unit: Yup.string().required("Vui lòng nhập đơn vị"),
    });

    /*
    const handleChange = (event) => {
        const {name, value} = event.target;
        if (event.target.type === "file") { // Handle file upload
            console.log(event.target.files[0]);
            setServices(prevServices => ({...prevServices, oldRecordPictureFile: event.target.files[0]}));
        }
        else if (event.target.type !== "select-one") { // Check if it's not a select element (Autocomplete)
            setServices(prevServices => ({...prevServices, [name]: value}));
        } else  { // Handle Autocomplete
            setServices(prevServices => ({...prevServices, customerId: value})); // Update sex specifically
        }
    };

    const handleUpdate = async () => {
        setDataChange(false);
        console.table(services);
        try {
            await validationSchema.validate(services, { abortEarly: false });
            setErrors({});

            if (services.id) {
                const formData = new FormData();
                // Add service data (text fields) to FormData
                for (const key in services) {
                    if (key !== 'oldRecordPictureFile') {
                        formData.append(key, services[key]);
                    }
                }
                // Add image file if selected
                if (services.oldRecordPictureFile) {
                    formData.append('oldRecordPictureFile', services.oldRecordPictureFile);
                }
                editAPIWithFile(functionName, services.id, formData)
                    .then(response => {
                        if (response.status === 200) {
                            setDataChange(true);
                            setOpen(false);
                            showAPI(functionName, id).then((response) => {
                                setServices(response.data);
                            }).catch(errors => {
                                console.log(errors);
                            });
                            alert("Lưu thành công");
                        } else {
                            console.error("Error updating customer:", response.statusText);
                            alert("Lưu thất bại");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("Có lỗi xảy ra");
                    });
            }
        } catch (err) {
            setErrors(err.inner.reduce((acc, error) => ({ ...acc, [error.path]: error.message }), {}));
        }
    };
     */

    const handleChange = (event) => {
        const {name, value} = event.target;
        setServices(prevProblem => ({...prevProblem, [name]: value}));
    };

    const handleUpdate = async () => {
        setDataChange(false);
        try {
            await validationSchema.validate(services, {abortEarly: false}); // Validate all fields at once
            setErrors({}); // Clear any previous errors if validation passes
            console.table(services);
            if (services.id) {
                editAPI(functionName, services.id, services)
                    .then(response => {
                        if (response.status === 200) { // Check for successful status code (e.g., 200)
                            setDataChange(true);
                            setOpen(false);
                            alert("Lưu thành công");
                        } else {
                            console.error("Error updating services:", response.statusText);
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
            <Grid container rowSpacing={3} columnSpacing={3}>
                <Grid item xs={6}>
                    <Autocomplete sx={{m: 1, width: "100%"}} value={services.customerName} options={customer}
                                  getOptionLabel={(option) => (option["name"] ? option["name"] : option)} // If the option is String, return String else return Object option
                                  onChange={(event, newValue) => {
                                      setServices({...services, customerId: newValue.id});
                                  }}
                                  renderInput={(params) => (
                                      <TextField {...params} id="outlined-basic1" label="Khách hàng"
                                                 variant="outlined" name="customerId"
                                                 error={!!errors.customerId} helperText={errors.customerId}/>
                                  )}
                                  renderOption={(props, option, {inputValue}) => {
                                      const {key, ...optionProps} = props;
                                      const matches = match(option.name, inputValue, {insideWords: true});
                                      const parts = parse(option.name, matches);

                                      return (
                                          <li key={key} {...optionProps}>
                                              <div>
                                                  {parts.map((part, index) => (
                                                      <span
                                                          key={index}
                                                          style={{
                                                              fontWeight: part.highlight ? 700 : 400,
                                                          }}
                                                      >
                                                {part.text}
                                            </span>
                                                  ))}
                                              </div>
                                          </li>
                                      );
                                  }}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Đơn giá" variant="outlined"
                               name="unitPrice" value={services.unitPrice} onChange={handleChange} type="number"
                               error={!!errors.unitPrice} helperText={errors.unitPrice} required
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic3" label="Ngày chốt" variant="outlined"
                               name="recordDay" value={services.recordDay} onChange={handleChange} type="date" required
                               error={!!errors.recordDay} helperText={errors.recordDay} InputLabelProps={{shrink: true}}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic4" label="Chỉ số cũ" variant="outlined"
                               name="oldRecord" value={services.oldRecord} onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic6" label="Tên dịch vụ" variant="outlined"
                               name="feeType" value={services.feeType} onChange={handleChange} required
                               error={!!errors.feeType} helperText={errors.feeType}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Đơn vị" variant="outlined"
                               name="unit" value={services.unit} onChange={handleChange} required
                               error={!!errors.unit} helperText={errors.unit}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic8" label="Tổng tiền" variant="outlined"
                               name="price" value={services.price} type="number" disabled
                    />
                    {/*
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic9" label="Ảnh chỉ số cũ" variant="outlined"
                               name="oldRecordPictureFile" onChange={handleChange} type="file" InputLabelProps={{shrink: true}}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic10" label="Ảnh chỉ số mới"
                               variant="outlined"
                               name="newRecordPicture" value={services.newRecordPicture} onChange={handleChange}
                    />
                    */}
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic5" label="Chỉ số mới" variant="outlined"
                               name="newRecord" value={services.newRecord} onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" color="success" onClick={() => handleUpdate()}>Lưu</Button>
                </Grid>
            </Grid>
        </Container>
    )
}