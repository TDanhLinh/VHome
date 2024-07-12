import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Autocomplete, Button, Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {editAPI, listAllAPI, showAPI} from "../../api/axios"
import * as Yup from 'yup'
import {DataTableContext} from "../../TableContext";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export default function UpdateFinance(props) {
    const {setOpen, id, functionName} = props;
    const {setDataChange} = useContext(DataTableContext);
    const [customer, setCustomer] = useState([]);
    const [services, setServices] = useState([]);
    const [finance, setFinance] = useState({
        name: '',
        servicesId: '',
        servicesName: '',
        createDay: '',
        customerId: '',
        customerName: '',
        room: '',
        building: '',
        term: '',
        money: '',
        paidMoney: '',
    });

    useEffect(() => {
        showAPI(functionName, id).then((response) => {
            setFinance(response.data);
        }).catch(errors => {
            console.log(errors);
        })
        listAllAPI("customer").then((response) => {
            setCustomer(response.data);
        }).catch(errors => {
            console.log(errors);
        })
        listAllAPI("services").then((response) => {
            setServices(response.data)
        })
    }, [functionName, id]);

    const [errors, setErrors] = useState({}); // State to store validation errors

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên hóa đơn"),
        servicesId: Yup.date().required("Vui lòng chọn dịch vụ"),
        createDay: Yup.date().required("Vui lòng chọn ngày tạo"),
        customerId: Yup.string().required("Vui lòng chọn khách hàng"),
        term: Yup.date().required("Vui lòng chọn kỳ hạn"),
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFinance(prevFinance => ({...prevFinance, [name]: value}));
    };

    const handleUpdate = async () => {
        setDataChange(false);
        try {
            await validationSchema.validate(finance, {abortEarly: false}); // Validate all fields at once
            setErrors({}); // Clear any previous errors if validation passes
            console.table(finance);
            if (finance.id) {
                editAPI(functionName, finance.id, finance)
                    .then(response => {
                        if (response.status === 200) { // Check for successful status code (e.g., 200)
                            setDataChange(true);
                            setOpen(false);
                            alert("Lưu thành công");
                        } else {
                            console.error("Error updating finance:", response.statusText);
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
                <Grid item xs={12}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic1" label="Tên hóa đơn" variant="outlined"
                               name="name" value={finance.name} onChange={handleChange} required
                               error={!!errors.name} // Set error prop if there's an error for this field
                               helperText={errors.name} // Display error message if it exists
                    />
                    <Autocomplete id="outlined-basic2" sx={{m: 1, width: "100%"}} value={finance.customerName}
                                  options={customer}
                                  getOptionLabel={(option) => (option["name"] ? option["name"] : option)} // If the option is String, return String else return Object option
                                  onChange={(event, newValue) => {
                                      setFinance({
                                          ...finance,
                                          customerId: newValue.id,
                                          room: newValue.room,
                                          building: newValue.building
                                      });
                                  }}
                                  renderInput={(params) => (
                                      <TextField {...params} id="outlined-basic2" label="Khách hàng"
                                                 variant="outlined" name="customerId"
                                                 error={!!errors.customerId} helperText={errors.customerId}/>
                                  )}
                                  renderOption={(props, option, {inputValue}) => {
                                      const {key, ...optionProps} = props;
                                      const matches = match(option.name, inputValue, {insideWords: true});
                                      const parts = parse(option.name, matches);

                                      return (<li key={key} {...optionProps}>
                                          <div>
                                              {parts.map((part, index) => (<span
                                                  key={index}
                                                  style={{
                                                      fontWeight: part.highlight ? 700 : 400,
                                                  }}
                                              >
                                                {part.text}
                                            </span>))}
                                          </div>
                                      </li>);
                                  }}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic3" label="Phòng" variant="outlined"
                               name="room" value={finance.room} onChange={handleChange} disabled
                               InputLabelProps={{shrink: true}}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic4" label="Tòa" variant="outlined"
                               name="building" value={finance.building} onChange={handleChange} disabled
                               InputLabelProps={{shrink: true}}
                    />
                    <Autocomplete id="outlined-basic5" sx={{m: 1, width: "100%"}} value={finance.servicesName}
                                  options={services}
                                  getOptionLabel={(option) => (option["feeType"] ? option["feeType"] : option)} // If the option is String, return String else return Object option
                                  onChange={(event, newValue) => {
                                      setFinance({...finance, servicesId: newValue.id});
                                  }}
                                  renderInput={(params) => (
                                      <TextField {...params} id="outlined-basic5" label="Dịch vụ"
                                                 variant="outlined" name="servicesId"
                                                 error={!!errors.servicesId} helperText={errors.servicesId}/>
                                  )}
                                  renderOption={(props, option, {inputValue}) => {
                                      const {key, ...optionProps} = props;
                                      const matches = match(option.feeType, inputValue, {insideWords: true});
                                      const parts = parse(option.feeType, matches);

                                      return (<li key={key} {...optionProps}>
                                          <div>
                                              {parts.map((part, index) => (<span
                                                  key={index}
                                                  style={{
                                                      fontWeight: part.highlight ? 700 : 400,
                                                  }}
                                              >
                                                {part.text}
                                            </span>))}
                                          </div>
                                      </li>);
                                  }}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic6" label="Ngày tạo" variant="outlined"
                               name="createDay" value={finance.createDay} onChange={handleChange} type="date" required
                               error={!!errors.createDay} helperText={errors.createDay} InputLabelProps={{shrink: true}}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Kỳ hạn" variant="outlined"
                               name="term" value={finance.term} onChange={handleChange} required type="date"
                               error={!!errors.term} helperText={errors.term} InputLabelProps={{shrink: true}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Tiền cần trả" variant="outlined"
                               name="money" value={finance.money} onChange={handleChange} type="number" disabled
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Tiền đã trả" variant="outlined"
                               name="paidMoney" value={finance.paidMoney} onChange={handleChange} type="number"
                    />
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" color="success" onClick={() => handleUpdate()}>Lưu</Button>
                </Grid>
            </Grid>
        </Container>
    )
}