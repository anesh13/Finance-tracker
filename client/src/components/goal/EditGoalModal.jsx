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
import { useState, useEffect } from 'react';

const EditGoalModal = ({ open, handleClose, goal, updateGoal }) => {
    const [editedGoal, setEditedGoal] = useState(goal);
    const handleChange = (e) => {
        setEditedGoal({ ...editedGoal, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.put(`${backendUrl}/goal/update/${goal._id}`, editedGoal, { headers });

            // Close the modal
            updateGoal();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };
    // console.log()
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Goal</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={editedGoal.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={editedGoal.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="currentAmount"
                    label="Current Amount"
                    type="number"
                    fullWidth
                    value={editedGoal.currentAmount}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="targetAmount"
                    label="Target Amount"
                    type="number"
                    fullWidth
                    value={editedGoal.targetAmount}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="targetDate"
                    label="Target Date"
                    type="date"
                    fullWidth
                    value={(editedGoal.targetDate).slice(0,10)}
                    onChange={handleChange}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditGoalModal;
