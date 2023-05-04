import AddBudgetModal from "./AddBudgetModal";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Button } from '@mui/material';
import './budget.scss';

const Budget = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="budget">
            <div className='top'>
                <h2> Budgets</h2>

                <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ margin: '20px 0' }}>
                    Add Budget
                </Button>
                <AddBudgetModal open={modalOpen} handleClose={handleCloseModal} />
            </div>

            <div className="bottom">
                <div>budget</div>
                <div id="piechart" style={{ width: '90%', height: '500px' }}></div>

            </div>

        </div>
    )
}
export default Budget;