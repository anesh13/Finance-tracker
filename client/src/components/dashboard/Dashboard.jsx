import { useState, useEffect } from 'react';
import './dashboard.scss';
import axios from 'axios';
import { backendUrl } from '../../config';
//import { NextSeo } from "next-seo";

const Dashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [goals, setGoals] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {

        fetchAccounts();
        fetchTransactions();


        getBudgets();
        getGoals();
    }, []);

    const fetchAccounts = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            //retrieve accounts data
            const [accountsResponse] = await Promise.all([
                axios.get(`${backendUrl}/account/all`, { headers }),

            ]);

            // console.log(accountsResponse.data);
            setAccounts(accountsResponse.data);

        } catch (error) {
            console.error(error);
        }
    };



    const fetchTransactions = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            //retrieve transactions data
            const [transactionsResponse] = await Promise.all([
                axios.get(`${backendUrl}/transaction/all`, { headers }),

            ]);


            setTransactions(transactionsResponse.data);
            console.log(transactionsResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getBudgets = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`${backendUrl}/budget/all`, { headers });

            setBudgets(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching budgets:", error);
        }
    };
    const getGoals = async () => {

        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`${backendUrl}/goal/all`, { headers });

            setGoals(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };
    return (
        <>
        {/* <NextSeo
        title="Finance Tracker"
        description="Track your personal finances with ease using our finance tracker app. Manage your budget, expenses, and income all in one place."
      /> */}
        <div className="dashboard">
            {/* <h2>Dashboard</h2> */}

            <div className="overview">
                {/* Display the overview of the user's financial situation */}
                <h3>Overview</h3>
                <p>Checking & Saving: {calculateTotalSavingsAndChecking(accounts)}</p>
                <p>Total Debt: {calculateTotalDebt(accounts)}</p>
                <p>Net worth: {calculateNetWorth(calculateTotalSavingsAndChecking(accounts), calculateTotalDebt(accounts))}</p>
            </div>

            <div className="account-summary">
                {/* Display the list of accounts with their respective balances */}
                <h3>Account Summary</h3>
                <ul>
                    {accounts.map((account) => (
                        <li key={account._id}>
                            {account.name} - {account.balance}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="transactions">
                {/* Display recent transactions */}
                <h3>Recent Transactions</h3>
                <ul>
                    {transactions.slice(0, 5).map((transaction) => {
                        const date = new Date(transaction.createdAt);
                        const month = date.toLocaleString('default', { month: 'long' });
                        const day = date.getDate();
                        const year = date.getFullYear();
                        const formattedDate = `${month} ${day}, ${year}`;

                        return (
                            <li key={transaction._id}>
                                {formattedDate}: {transaction.description} - {transaction.amount}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="budget">
                {/* Display the budget overview with progress bars */}
                <h3>Budget</h3>
                {budgets.map((budget) => {
                    const spent = calculateSpentAmount(budget, transactions);
                    return (
                        <div key={budget._id} className="budget-item">
                            <p>{budget.name}</p>
                            <progress value={spent} max={budget.amount}></progress>
                        </div>
                    );
                })}
            </div>

            <div className="goals">
                {/* Display the user's financial goals */}
                <h3>Goals</h3>
                {goals.map((goal) => (
                    <div key={goal._id} className="goal-item">

                        <p>{goal.name}</p>
                        <progress value={goal.currentAmount} max={goal.targetAmount}></progress>
                    </div>
                ))}
            </div>

        </div>
        </>
    );
};

export default Dashboard;

const calculateTotalSavingsAndChecking = (accounts) => {
    return accounts.reduce((total, account) => {
        return (account.type === 'Savings' || account.type === 'Checking') ? total + account.balance : total;
    }, 0);
};

const calculateTotalDebt = (accounts) => {
    return accounts.reduce((total, account) => {
        return (account.type === 'Credit Card' || account.type === 'Loan') ? total + account.balance : total;
    }, 0);
};

const calculateNetWorth = (totalSavingsAndChecking, totalDebt) => {
    return totalSavingsAndChecking - totalDebt;
};

const calculateSpentAmount = (budget, transactions) => {
    const currentDate = new Date();
    const startDate = new Date(budget.startDate);
    const endDate = new Date(budget.endDate);

    // Check if the current date is within the budget period
    if (currentDate >= startDate && currentDate <= endDate) {
        // Calculate the spent amount for this budget
        const spent = transactions.reduce((total, transaction) => {
            const transactionDate = new Date(transaction.createdAt);
            return (
                transactionDate >= startDate &&
                transactionDate <= endDate &&
                // TODO: Add category condition to filter
                total + transaction.amount
            );
        }, 0);

        console.log(spent);
        return spent;
    }

    return 0;
};
