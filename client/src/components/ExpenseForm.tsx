import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";

type Transaction = {
  id: number;
  dateTime: string;
  author: string;
  sum: number;
  category: string;
  comment: string;
};

type ExpenseFormProps = {
  onAddTransaction: (transaction: Transaction) => void;
  editingTransaction: Transaction | null;
  onUpdateTransaction: (transaction: Transaction) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
}) => {
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");
  const [category, setCategory] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (editingTransaction) {
      setDate(editingTransaction.dateTime);
      setAmount(editingTransaction.sum);
      setCategory(editingTransaction.category);
      setComment(editingTransaction.comment);
    }
  }, [editingTransaction]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // Сообщение исчезнет через 3 секунды
      return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента или при изменении message
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const expenseData = {
      date,
      amount: Number(amount),
      category,
      comment,
    };

    try {
      if (editingTransaction) {
        const response = await axios.put(
          `http://localhost:5000/api/transactions/${editingTransaction.id}`,
          expenseData
        );
        onUpdateTransaction(response.data);
        setMessage("Expense updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/transactions",
          expenseData
        );
        onAddTransaction(response.data);
        setMessage("Expense added successfully!");
      }

      setDate("");
      setAmount("");
      setCategory("");
      setComment("");
    } catch (error) {
      console.error("There was an error!", error);
      setMessage("Failed to save expense.");
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant='h6'
        gutterBottom
      >
        {editingTransaction ? "Редактировать расход" : "Добавить расход"}
      </Typography>
      <TextField
        id='date'
        label='Дата'
        type='date'
        value={date}
        onChange={e => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        id='amount'
        label='Сумма'
        type='number'
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <FormControl required>
        <InputLabel id='category-label'>Категория</InputLabel>
        <Select
          labelId='category-label'
          id='category'
          value={category}
          onChange={e => setCategory(e.target.value)}
          label='Категория'
        >
          <MenuItem value='food'>Еда</MenuItem>
          <MenuItem value='transport'>Транспорт</MenuItem>
          <MenuItem value='entertainment'>Развлечения</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id='comment'
        label='Комментарий'
        multiline
        rows={4}
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
      >
        {editingTransaction ? "Обновить расход" : "Добавить расход"}
      </Button>
      {message && (
        <Typography
          variant='body2'
          color='secondary'
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ExpenseForm;
