import AddGoalModal from "./AddGoalModal";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Button } from '@mui/material';
import './goal.scss'

const Goal = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    return (
        <div className="goal">
            <div className='top'>
                <h2> Goals</h2>

                <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ margin: '20px 0' }}>
                    Add Goal
                </Button>
                <AddGoalModal open={modalOpen} handleClose={handleCloseModal} />
            </div>

            <div className="bottom">
                <div>Goals</div>
                <div id="piechart" style={{ width: '90%', height: '500px' }}></div>

            </div>

        </div>
    )
}
export default Goal;