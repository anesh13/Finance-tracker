
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
    Paper,
    // FormControlLabel,
    // Switch,
    TablePagination,
    TableSortLabel,
    Chip,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import './bill.scss';

const Bill = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [bills, setBills] = useState([]);
    // const [showPaidBills, setShowPaidBills] = useState(false);
    const [billStatus, setBillStatus] = useState('due');


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('dueDate');
    const [order, setOrder] = useState('asc');

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


    //filter paid or unpaid bills
    // const filteredBills = showPaidBills ? bills.filter((bill) => bill.isPaid) : bills;
    // const filteredBills = showPaidBills ? bills.filter((bill) => bill.isPaid) : bills.filter((bill) => !bill.isPaid);
    const filteredBills = bills.filter((bill) => {
        if (billStatus === 'due') {
            return !bill.isPaid;
        } else if (billStatus === 'paid') {
            return bill.isPaid;
        }
        return true;
    });




    const sortedBills = filteredBills.sort((a, b) => {
        const isAsc = order === 'asc';
        if (orderBy === 'name') {
            return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (orderBy === 'amount') {
            return isAsc ? a.amount - b.amount : b.amount - a.amount;
        } else if (orderBy === 'dueDate') {
            return isAsc ? new Date(a.dueDate) - new Date(b.dueDate) : new Date(b.dueDate) - new Date(a.dueDate);
        }
        return 0;
    });

    const handleBillStatusChange = (event, newStatus) => {
        if (newStatus !== null) {
            setBillStatus(newStatus);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortChange = (property) => {
        const newOrderBy = property;
        let newOrder = 'desc';

        if (orderBy === property && order === 'desc') {
            newOrder = 'asc';
        }

        setOrder(newOrder);
        setOrderBy(newOrderBy);
    };


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

                {/* toggle for paid or unpaid bills */}
                {/* <FormControlLabel
                    control={
                        <Switch
                            checked={showPaidBills}
                            onChange={() => setShowPaidBills(!showPaidBills)}
                            name="showPaidBills"
                        />
                    }
                    label="Show Paid Bills"
                /> */}
                <div className="bill-status-toggle">
                    <ToggleButtonGroup
                        value={billStatus}
                        exclusive
                        onChange={handleBillStatusChange}
                        aria-label="bill status"
                    >
                        <ToggleButton value="due" aria-label="due">
                            Due
                        </ToggleButton>
                        <ToggleButton value="paid" aria-label="paid">
                            Paid
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <TableContainer className='TableContainer' component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={() => handleSortChange('name')}
                                    >
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sortDirection={orderBy === 'amount' ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === 'amount'}
                                        direction={orderBy === 'amount' ? order : 'asc'}
                                        onClick={() => handleSortChange('amount')}
                                    >
                                        Amount
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sortDirection={orderBy === 'dueDate' ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === 'dueDate'}
                                        direction={orderBy === 'dueDate' ? order : 'asc'}
                                        onClick={() => handleSortChange('dueDate')}
                                    >
                                        Due Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedBills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bill) => (
                                <TableRow key={bill._id}>
                                    <TableCell>{bill.name}</TableCell>
                                    <TableCell>{bill.amount}</TableCell>
                                    <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                                    {/* <TableCell>
                                        <Button
                                            variant="contained"
                                            color={bill.isPaid ? "secondary" : "primary"}
                                            onClick={() => handleMarkAsPaid(bill._id, !bill.isPaid)}
                                        >
                                            {bill.isPaid ? "Unmark as Paid" : "Mark as Paid"}
                                        </Button>
                                    </TableCell> */}
                                    <TableCell>
                                        <Chip
                                            label={bill.isPaid ? "Paid" : "Mark as Paid"}
                                            onClick={() => handleMarkAsPaid(bill._id, !bill.isPaid)}
                                            color={bill.isPaid ? "secondary" : "primary"}
                                        />
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={sortedBills.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </TableContainer>
            </div>
        </div>


    );
}
export default Bill;
