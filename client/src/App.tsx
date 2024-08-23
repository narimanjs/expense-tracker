import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import TransactionList from "./components/TransactionList";
import { Container, CssBaseline, Grid } from "@mui/material";
import axios from "axios";

type Transaction = {
  id: number;
  dateTime: string;
  author: string;
  sum: number;
  category: string;
  comment: string;
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://expense-tracker-dusky-ten.vercel.app/api/transactions"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);
  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await axios.delete(
        `https://expense-tracker-dusky-ten.vercel.app/api/transactions/${id}`
      );
      setTransactions(
        transactions.filter(transaction => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map(transaction =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    setEditingTransaction(null);
  };

  return (
    <Container component='main'>
      <CssBaseline />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Трекер расходов
      </h1>
      <Grid
        container
        // spacing={1}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <ExpenseForm
            onAddTransaction={handleAddTransaction}
            editingTransaction={editingTransaction}
            onUpdateTransaction={handleUpdateTransaction}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
