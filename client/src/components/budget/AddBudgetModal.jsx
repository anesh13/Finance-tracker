import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import axios from "axios";
import { backendUrl } from "../../config";
import { useState } from 'react';

const AddBudgetModal = ({ open, handleClose }) => {
    const [budget, setBudget] = useState({});

    const handleChange = (e) => {
        setBudget({ ...budget, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.post(`${backendUrl}/budget/create`, budget, { headers });

            // Close the modal
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Budget</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="amount"
                    label="Amount"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel>Period</InputLabel>
                    <Select
                        name="period"
                        value={budget.period || ''}
                        onChange={handleChange}
                    >
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    fullWidth
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    name="endDate"
                    label="End Date"
                    type="date"
                    fullWidth
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </DialogContent>



            <DialogActions style={{
                display: 'flex',
                justifyContent: 'space-between'

            }}>
                <Button onClick={handleSubmit}>Add</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>

        </Dialog>
    );
};

export default AddBudgetModal;
