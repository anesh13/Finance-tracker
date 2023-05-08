import { useState, useEffect, useMemo } from 'react';
import axios, { all } from 'axios';
import { GoogleCharts } from 'google-charts';
import { backendUrl } from '../../config';
import './transaction.scss'
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';


import AddTransactionModal from './AddTransactionModal';
import { Button } from '@mui/material';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  
const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState('expense'); //expense default
    const [allTransactions, setAllTransactions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };



    const getTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(`${backendUrl}/transaction/byCategory?type=${type}`, { headers });
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            //retrieve transactions data
            const [transactionsResponse] = await Promise.all([
                axios.get(`${backendUrl}/transaction/all`, { headers }),

            ]);


            setAllTransactions(transactionsResponse.data);
            //console.log(transactionsResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTransactions();
    }, [type]);

    useEffect(() => {
        fetchTransactions();
    }, [type]);


    useEffect(() => {
        GoogleCharts.load(drawChart);
    }, [transactions]);

    const drawChart = () => {
        const data = new GoogleCharts.api.visualization.DataTable();
        data.addColumn('string', 'Category');
        data.addColumn('number', 'Amount');


        // const formattedData = transactions.map((transaction) => [transaction._id, transaction.totalAmount]);
        const formattedData = transactions.map((transaction) => [String(transaction._id), transaction.totalAmount]);
        // console.log(formattedData);
        data.addRows(formattedData);

        const options = {
            title: type === 'expense' ? 'Expenses by Category' : 'Income by Category',
            // is3D: true,
            pieHole: 0.5,
            pieSliceTextStyle: {
                color: 'black',
            },
            // legend: 'none'

        };

        const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    };

    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allTransactions.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const transactionsTable = useMemo(() => {
    const firstPageIndex = (page - 1) * rowsPerPage;
    const lastPageIndex = firstPageIndex + rowsPerPage;
    return allTransactions.slice(firstPageIndex, lastPageIndex);
  }, [page]);

    return (
        <div className='transaction'>
            <div className='top'>
                <h2> Transactions</h2>
                <div>
                    <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ margin: '20px 0' }}>
                        Add Transaction
                    </Button>
                    <AddTransactionModal open={modalOpen} handleClose={handleCloseModal} handleAddedTransaction={getTransactions} />
                </div>
            </div>

            <div className='bottom'>

                <div id="piechart" style={{ width: '90%', height: '500px' }}></div>

                {/* <select className='select' value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="expense">Expenses</option>
                    <option value="income">Income</option>
                </select> */}
            </div>

            <div className='bottom'>

                <div id="piechart2" style={{ width: '90%', height: '500px' }}></div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Account</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {(rowsPerPage > 0
            ? allTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allTransactions
          ).map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.account}</TableCell>
                                </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
          <TableRow>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={allTransactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
          </TableFooter>
                    </Table>
                </TableContainer>
               
      
            </div>

        </div>
    );
};

export default Transaction;
