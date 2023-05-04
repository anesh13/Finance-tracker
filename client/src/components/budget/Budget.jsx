import AddBudgetModal from "./AddBudgetModal";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Button } from '@mui/material';

const Budget = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            Budget

            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Add Budget
            </Button>
            <AddBudgetModal open={modalOpen} handleClose={handleCloseModal} />

        </div>
    )
}
export default Budget;