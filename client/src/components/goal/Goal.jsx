import AddGoalModal from "./AddGoalModal";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Button } from '@mui/material';


const Goal = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    return (
        <div>
            Goal
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Add Goal
            </Button>
            <AddGoalModal open={modalOpen} handleClose={handleCloseModal} />

        </div>
    )
}
export default Goal;