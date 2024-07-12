/*
This is a component that displays a table with the labels and data provided by the pages
*/
import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {DataTableContext, ElementTableContext, LableTableContext} from "./TableContext";
import {Button, IconButton, Stack, TextField} from "@mui/material";
import ModalDialog from "./ModalDialog";
import AddIcon from "@mui/icons-material/Add";
import {deleteAPI, searchAPI} from "./api/axios";
import ClearIcon from '@mui/icons-material/Clear';

export default function DisplayTable(props) {
    // It's using label and data context provided by the pages
    const {label} = useContext(LableTableContext);
    const {data, setDataChange} = useContext(DataTableContext);
    const {element} = useContext(ElementTableContext);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {header, buttonTitle, functionName} = props;

    const [openInfo, setOpenInfo] = useState(false);
    const [modalAction, setModalAction] = useState(null); // Track button action for modal content
    const [id, setId] = useState({});
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredData, setFilteredData] = useState(data); // State to hold filtered data

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAdd = () => {
        setModalAction(functionName + '/add');
        setOpenInfo(true);
    }

    const handleView = (id) => {
        setModalAction(functionName + '/view'); // Set action for modal content (e.g., display item details)
        setOpenInfo(true);
        setId(id);
    };

    const handleEdit = (id) => {
        setModalAction(functionName + '/edit'); // Set action for modal content (e.g., edit form)
        setOpenInfo(true);
        setId(id);
    };

    const handleDelete = (id) => {
        setDataChange(false);
        deleteAPI(functionName, id).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setDataChange(true);
                alert("Xóa thành công");
            } else {
                console.error("Error deleting:", response.statusText);
                alert("Xóa thất bại");
            }
        }).catch(error => {
            console.error(error);
        })
    };

    const handleSearch = async (value) => {
        setSearchTerm(value);
        if (value.length >= 1) {
            try {
                const response = await searchAPI(functionName, value);
                setFilteredData(response.data);
            } catch (error) {
                console.error("Error:", error);
                alert("Có lỗi xảy ra");
            }
        } else {
            setFilteredData(data); // Reset to original data when search term is empty
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setFilteredData(data); // Reset to original data
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <div style={{display: "flex", justifyContent: "space-between", margin: "1rem 3rem 1rem 3rem"}}>
                <h4>{header}</h4>
                <Stack direction="row" spacing={2}>
                    <TextField label="Tìm kiếm" variant="outlined" size="small" value={searchTerm}
                               onChange={(e) => handleSearch(e.target.value)}
                               InputProps={{
                                   endAdornment: (
                                       searchTerm && ( // Conditionally render the clear icon
                                           <IconButton onClick={clearSearch}>
                                               <ClearIcon/>
                                           </IconButton>
                                       )
                                   )
                               }}
                    />
                    <Button title={buttonTitle} variant="contained" size="small" onClick={handleAdd}
                            sx={{backgroundColor: "green", color: "white", borderRadius: 2}}>
                        <AddIcon fontSize="inherit"/>
                    </Button>
                </Stack>
            </div>
            <TableContainer sx={{maxHeight: 600}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {/* Mapping through labels */}
                            {label.map((item) => (
                                <TableCell
                                    key={item.id}
                                    align="center"
                                    style={{maxWidth: item.maxWidth}}
                                >
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData // Use filteredData for table rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                    {/* Mapping through table elements */}
                                    {element.map((e) => {
                                        const value = item[e];
                                        return (
                                            <TableCell key={e} align="center">
                                                {e.format && typeof value === 'number'
                                                    ? e.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                    {/* Action buttons */}
                                    <TableCell align="center" style={{maxWidth: '11rem'}}>
                                        <Button variant="contained" color="info" size="small"
                                                onClick={() => handleView(item.id)} style={{marginRight: '0.5rem'}}>
                                            Xem
                                        </Button>
                                        <Button variant="contained" color="warning" size="small"
                                                onClick={() => handleEdit(item.id)} style={{marginRight: '0.5rem'}}>
                                            Sửa
                                        </Button>
                                        <Button variant="contained" color="error" size="small"
                                                onClick={() => handleDelete(item.id)}>
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[10, 15, 20]} component="div" count={data.length} page={page}
                             onPageChange={handleChangePage} rowsPerPage={rowsPerPage}
                             onRowsPerPageChange={handleChangeRowsPerPage}
                             sx={{
                                 "& .MuiTablePagination-selectLabel": { // Target specific class for menu items
                                     marginTop: "1rem"
                                 },
                                 "& .MuiTablePagination-displayedRows": { // Target specific class for menu items
                                     marginTop: "1rem"
                                 }
                             }}
            />
            <ModalDialog open={openInfo} setOpen={setOpenInfo} action={modalAction}
                         id={id} functionName={functionName} setFilteredData={setFilteredData}/>
        </Paper>
    );
}
