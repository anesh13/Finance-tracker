import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@mui/material";
import axios from "axios";
import { backendUrl } from "../../config";
import { useState } from 'react';

const AddGoalModal = ({ open, handleClose }) => {
    const [goal, setGoal] = useState({});

    const handleChange = (e) => {
        setGoal({ ...goal, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // TODO 
            // await axios.post(`${backendUrl}/goal/create`, goal, { headers }); 

            // Close the modal
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Goal</DialogTitle>

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
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="currentAmount"
                    label="Current Amount"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="targetAmount"
                    label="Target Amount"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="targetDate"
                    label="Target Date"
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

export default AddGoalModal;
