import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {showAPI} from "../../api/axios"

export default function ShowProblem(props) {
    const {id, functionName} = props;
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

    return (
        <Container fixed>
            <Grid container columnSpacing={3}>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic1" label="Tên sự cố" variant="outlined"
                               name="name" value={problem.name}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic4" label="Tòa" variant="outlined"
                               name="building" value={problem.building}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Người xử lý" variant="outlined"
                               name="implementer" value={problem.implementer}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic2" label="Trạng thái" variant="outlined"
                               name="status" value={problem.status}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic10" label="Loại sự cố"
                               variant="outlined" name="type" value={problem.type}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic7" label="Phòng" variant="outlined"
                               name="room" value={problem.room}
                    />
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic5" label="Thời hạn" variant="outlined"
                               name="term" value={problem.term} InputLabelProps={{shrink: true}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField sx={{m: 1, width: "100%"}} id="outlined-basic12" label="Mô tả" multiline
                               variant="outlined" name="description" value={problem.description}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}