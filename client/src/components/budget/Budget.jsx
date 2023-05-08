import AddBudgetModal from "./AddBudgetModal";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Button } from '@mui/material';
import './budget.scss';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

const Budget = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [budgets, setBudgets] = useState([]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    const getBudgets = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`${backendUrl}/budget/all`, { headers });

            setBudgets(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error("Error fetching budgets:", error);
        }
    };

    useEffect(() => {
        getBudgets();
    }, []);

    return (
        <div className="budget">
            <div className='top'>
                <h2> Budgets</h2>

                <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ margin: '20px 0' }}>
                    Add Budget
                </Button>
                <AddBudgetModal open={modalOpen} handleClose={handleCloseModal} handleAddedBudget={getBudgets} />
            </div>

            <div className="bottom">
                <div>budget</div>
                <div id="piechart" style={{ width: '90%', height: '500px' }}></div>

            
            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className='table-header'>
                                <TableCell className='center-align tab-header'>Name</TableCell>
                                <TableCell className='center-align tab-header'>Amount</TableCell>
                                <TableCell className='center-align tab-header'>Period</TableCell>
                                <TableCell className='center-align tab-header'>Start Date</TableCell>
                                <TableCell className='center-align tab-header'>End Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='table-body'>
                            {budgets.map((budget) => (
                                <TableRow key={budget._id} className='table-row'>
                                    <TableCell className='center-align'>{budget.name}</TableCell>
                                    <TableCell className='center-align'>{budget.amount}</TableCell>
                                    <TableCell className='center-align'>{budget.period}</TableCell>
                                    <TableCell className='center-align'>{new Date(budget.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell className='center-align'>{new Date(budget.endDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            </div>
        </div>
    )
}
export default Budget;