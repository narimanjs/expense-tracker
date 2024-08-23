import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Типизация для транзакции
type Transaction = {
  id: number;
  dateTime: string;
  author: string;
  sum: number;
  category: string;
  comment: string;
};

// Простая база данных в памяти
let transactions: Transaction[] = [];

// POST: Добавление новой транзакции
app.post("/api/transactions", (req: Request, res: Response) => {
  const { date, amount, category, comment } = req.body;

  const newTransaction: Transaction = {
    id: transactions.length + 1,
    dateTime: date,
    author: "Nariman", // Для простоты используем фиксированного автора
    sum: amount,
    category,
    comment,
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// GET: Получение всех транзакций
app.get("/api/transactions", (req: Request, res: Response) => {
  res.json(transactions);
});

// DELETE: Удаление транзакции по ID
app.delete("/api/transactions/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const transactionId = parseInt(id);

  transactions = transactions.filter(
    transaction => transaction.id !== transactionId
  );

  res.status(204).send(); // 204 No Content - Успешно, но без содержания
});

// PUT: Обновление транзакции по ID
app.put("/api/transactions/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, amount, category, comment } = req.body;
  const transactionId = parseInt(id);

  const transactionIndex = transactions.findIndex(
    transaction => transaction.id === transactionId
  );
  if (transactionIndex !== -1) {
    const updatedTransaction: Transaction = {
      id: transactionId,
      dateTime: date,
      author: "Nariman", // Оставляем автора неизменным
      sum: amount,
      category,
      comment,
    };

    transactions[transactionIndex] = updatedTransaction;
    res.json(updatedTransaction);
  } else {
    res.status(404).json({ error: "Transaction not found" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
