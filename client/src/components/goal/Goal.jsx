import AddGoalModal from "./AddGoalModal";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Button } from '@mui/material';
import './goal.scss'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    // LinearProgressWithLabel,
    // LinearProgress
} from "@mui/material";
import { Box, Typography, LinearProgress } from '@mui/material';

const Goal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [goals, setGoals] = useState([]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    const getGoals = async () => {

        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`${backendUrl}/goal/all`, { headers });

            setGoals(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    useEffect(() => {
        getGoals();
    }, []);
    const calculateGoalProgress = (currentAmount, targetAmount) => {
        return (currentAmount / targetAmount) * 100;
    };

    return (
        <div className="goal">
            <div className='top'>
                <h2> Goals</h2>

                <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ margin: '20px 0' }}>
                    Add Goal
                </Button>
                <AddGoalModal open={modalOpen} handleClose={handleCloseModal} updateGoal={getGoals} />
            </div>

            <div className="bottom">
                <div>Goals</div>
                {/* <div id="piechart" style={{ width: '90%', height: '500px' }}></div> */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Current Amount</TableCell>
                                <TableCell>Target Amount</TableCell>
                                <TableCell>Target Date</TableCell>
                                <TableCell>Progress</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {goals.map((goal) => (
                                <TableRow key={goal._id}>
                                    <TableCell>{goal.name}</TableCell>
                                    <TableCell>{goal.description}</TableCell>
                                    <TableCell>{goal.currentAmount}</TableCell>
                                    <TableCell>{goal.targetAmount}</TableCell>
                                    {/* <TableCell>{goal.targetDate}</TableCell> */}
                                    <TableCell>
                                        {new Date(goal.targetDate).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell>
                                        <LinearProgressWithLabel
                                            variant="determinate"
                                            value={calculateGoalProgress(goal.currentAmount, goal.targetAmount)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </div>
    )
}
export default Goal;


//Linear with label progress MUI
export function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

