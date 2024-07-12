/*
Handle popup dialog
*/
import React from 'react'
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddNewCustomer from "./form/customer/AddNewCustomer";
import ShowCustomer from "./form/customer/ShowCustomer";
import UpdateCustomer from "./form/customer/UpdateCustomer";
import AddNewServices from "./form/services/AddNewServices";
import ShowServices from "./form/services/ShowServices";
import UpdateServices from "./form/services/UpdateServices";
import AddNewFinance from "./form/finance/AddNewFinance";
import ShowFinance from "./form/finance/ShowFinance";
import UpdateFinance from "./form/finance/UpdateFinance";
import AddNewEquipment from "./form/equipment/AddNewEquipment";
import ShowEquipment from "./form/equipment/ShowEquipment";
import UpdateEquipment from "./form/equipment/UpdateEquipment";
import AddNewProblem from "./form/problem/AddNewProblem";
import ShowProblem from "./form/problem/ShowProblem";
import UpdateProblem from "./form/problem/UpdateProblem";

export default function ModalDialog(props) {
    const {open, setOpen} = props;
    const {id, action, functionName} = props;

    return (
        <Dialog open={open}>
            <DialogTitle>Chi tiết</DialogTitle>
            <IconButton aria-label="close" onClick={() => setOpen(false)}
                        sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}>
                <CloseIcon/>
            </IconButton>
            <DialogContent>
                {/* Handle Customer Modal */}
                {action === "customer/add" && <AddNewCustomer setOpen={setOpen} functionName={functionName}/>}
                {action === "customer/view" && <ShowCustomer id={id} functionName={functionName}/>}
                {action === "customer/edit" && <UpdateCustomer setOpen={setOpen} id={id} functionName={functionName}/>}
                {/* Handle Services Modal */}
                {action === "services/add" && <AddNewServices setOpen={setOpen} functionName={functionName}/>}
                {action === "services/view" && <ShowServices id={id} functionName={functionName}/>}
                {action === "services/edit" && <UpdateServices setOpen={setOpen} id={id} functionName={functionName}/>}
                {/* Handle Finance Modal */}
                {action === "finance/add" && <AddNewFinance setOpen={setOpen} functionName={functionName}/>}
                {action === "finance/view" && <ShowFinance id={id} functionName={functionName}/>}
                {action === "finance/edit" && <UpdateFinance setOpen={setOpen} id={id} functionName={functionName}/>}
                {/* Handle Equipment Modal */}
                {action === "equipment/add" && <AddNewEquipment setOpen={setOpen} functionName={functionName}/>}
                {action === "equipment/view" && <ShowEquipment id={id} functionName={functionName}/>}
                {action === "equipment/edit" && <UpdateEquipment setOpen={setOpen} id={id} functionName={functionName}/>}
                {/* Handle Problem Modal */}
                {action === "problem/add" && <AddNewProblem setOpen={setOpen} functionName={functionName}/>}
                {action === "problem/view" && <ShowProblem id={id} functionName={functionName}/>}
                {action === "problem/edit" && <UpdateProblem setOpen={setOpen} id={id} functionName={functionName}/>}
            </DialogContent>
        </Dialog>
    );
}
