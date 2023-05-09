import AddBillModal from './AddBillModal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Button } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import './bill.scss';
const Bill = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [bills, setBills] = useState([]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const getBills = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`${backendUrl}/bill/all`, { headers });

            setBills(response.data);
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    };

    //mark the bill as paid
    const handleMarkAsPaid = async (billId, isPaid) => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.put(`${backendUrl}/bill/${billId}/pay`, { isPaid }, { headers });

            // Update the bills list
            getBills();
        } catch (error) {
            console.error("Error marking bill as paid:", error);
        }
    };

    useEffect(() => {
        getBills();
    }, []);

    return (
        <div className="bills">
            <div className='top'>
                <h2> Bills</h2>

                <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ margin: '20px 0' }}>
                    Add Bill
                </Button>
                <AddBillModal open={modalOpen} handleClose={handleCloseModal} handleAddedBill={getBills} />
            </div>

            <div className="bottom">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Due Date</TableCell>
                                {/* <TableCell>Action</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bills.map((bill) => (
                                <TableRow key={bill._id}>
                                    <TableCell>{bill.name}</TableCell>
                                    <TableCell>{bill.amount}</TableCell>
                                    <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color={bill.isPaid ? "secondary" : "primary"}
                                            onClick={() => handleMarkAsPaid(bill._id, !bill.isPaid)}
                                        >
                                            {bill.isPaid ? "Unmark as Paid" : "Mark as Paid"}
                                        </Button>
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
export default Bill;
