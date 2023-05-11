import AddGoalModal from './AddGoalModal';
import EditGoalModal from './EditGoalModal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Button } from '@mui/material';
import './goal.scss';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    // LinearProgressWithLabel,
    // LinearProgress,
    Box,
    Typography,
    LinearProgress,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    TablePagination,
} from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';


const Goal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [goals, setGoals] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const { t } = useTranslation();
    //pagination/sort
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');



    //menu item for edit or remove goal
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpenMenu = (e, goal) => {
        // setEditGoal(goal);
        setAnchorEl(e.currentTarget);
    };
    const handleCloseMenu = () => {
        // setEditGoal(null);
        setAnchorEl(null);
    };


    //modal
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleEditModalOpen = (goal) => {
        setSelectedGoal(goal);
        setEditModalOpen(true);

        //close menu item
        setAnchorEl(null);
    };

    const handleEditModalClose = () => {
        console.log("Closing modal");
        setEditModalOpen(false);
        setSelectedGoal(null);
    };

    const getGoals = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`${backendUrl}/goal/all`, { headers });

            setGoals(response.data);
            // console.log(response.data)
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

    //  var data = new google.visualization.DataTable();
    //  data.addColumn('timeofday', 'Time of Day');
    //  data.addColumn('number', 'Motivation Level');
    //  data.addColumn('number', 'Energy Level');

    // data.addRows([
    //   [{v: [8, 0, 0], f: '8 am'}, 1, .25],
    //   [{v: [9, 0, 0], f: '9 am'}, 2, .5],
    //   [{v: [10, 0, 0], f:'10 am'}, 3, 1],
    //   [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
    //   [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
    //   [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
    //   [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
    //   [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
    //   [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
    //   [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
    // ]);

    // var options = {
    //   title: 'Motivation and Energy Level Throughout the Day',
    //   isStacked: true,
    //   hAxis: {
    //     title: 'Time of Day',
    //     format: 'h:mm a',
    //     viewWindow: {
    //       min: [7, 30, 0],
    //       max: [17, 30, 0]
    //     }
    //   },
    //   vAxis: {
    //     title: 'Rating (scale of 1-10)'
    //   }
    // };


    //sort/ pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortChange = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedGoals = goals
        .slice()
        .sort((a, b) => (order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy])));


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
                {/* <Chart
          chartType='Bar'
          width='100%'
          height='400px'
          data={data}
          options={options}
        /> */}
                <div id="piechart" style={{ width: '90%', height: '500px' }}></div>
            </div>

            <div className="bottom">
                {/* <div id="piechart" style={{ width: '90%', height: '500px' }}></div> */}
                <Paper sx={{ width: '100%' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className='table-header'>
                                    <TableCell className='center-align tab-header'>Name</TableCell>
                                    <TableCell className='center-align tab-header'>Description</TableCell>
                                    <TableCell className='center-align tab-header'>Current Amount</TableCell>
                                    <TableCell className='center-align tab-header'>Target Amount</TableCell>
                                    <TableCell className='center-align tab-header'>Target Date</TableCell>
                                    <TableCell className='center-align tab-header'>Progress</TableCell>
                                    <TableCell className='center-align tab-header'> </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody className='table-body'>
                                {goals.map((goal) => (
                                    <TableRow key={goal._id} className='table-row'>
                                        <TableCell className='center-align'>{t(goal.name)}</TableCell>
                                        <TableCell className='center-align'>{t(goal.description)}</TableCell>
                                        <TableCell className='center-align'>{goal.currentAmount}</TableCell>
                                        <TableCell className='center-align'>{goal.targetAmount}</TableCell>
                                        {/* <TableCell>{goal.targetDate}</TableCell> */}
                                        <TableCell className='center-align'>
                                            {(goal.targetDate).slice(0, 10)}
                                        </TableCell>

                                        <TableCell className='center-align'>
                                            <LinearProgressWithLabel
                                                variant="determinate"
                                                value={calculateGoalProgress(goal.currentAmount, goal.targetAmount)}
                                            />
                                        </TableCell>


                                        <TableCell>
                                            <IconButton onClick={(e) => handleOpenMenu(e, goal)}>
                                                <MoreVert />
                                            </IconButton>
                                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>

                                                {/* edit   */}
                                                <MenuItem onClick={() => handleEditModalOpen(goal)} >
                                                    <ListItemIcon>
                                                        <Edit fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Edit" />
                                                </MenuItem>

                                                {/* delete */}
                                                <MenuItem
                                                // onClick={() => handleDelete(selectedGoal)}
                                                >
                                                    <ListItemIcon>
                                                        <Delete fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Delete" />
                                                </MenuItem>
                                            </Menu>
                                        </TableCell>




                                        {/* <TableCell>
                                        <Button variant="contained" color="primary" style={{ margin: "20px 0" }} onClick={() => handleEditModalOpen(goal)}>
                                            Edit
                                        </Button>
                                    </TableCell> */}
                                    </TableRow>
                                ))}


                                {editModalOpen && (<EditGoalModal
                                    open={editModalOpen}
                                    handleClose={handleEditModalClose}
                                    goal={selectedGoal}
                                    updateGoal={getGoals}
                                />)}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={goals.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
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

