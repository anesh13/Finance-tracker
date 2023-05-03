import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleCharts } from 'google-charts';
import { backendUrl } from '../../config';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState('expense'); //expense default

    useEffect(() => {
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
        getTransactions();
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

        data.addRows(formattedData);

        const options = {
            title: type === 'expense' ? 'Expenses by Category' : 'Income by Category',
            is3D: true,
        };

        const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    };

    return (
        <div>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="expense">Expenses</option>
                <option value="income">Income</option>
            </select>
            <div id="piechart" style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
};

export default Transaction;
