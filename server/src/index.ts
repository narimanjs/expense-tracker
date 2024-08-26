import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

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

// Путь к файлу для хранения данных
const dataFilePath = path.join(__dirname, "transactions.json");

// Функция для загрузки транзакций из файла
const loadTransactions = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    transactions = JSON.parse(data);
  } catch (error) {
    console.error("Could not load transactions from file:", error);
    transactions = [];
  }
};

// Функция для сохранения транзакций в файл
const saveTransactions = () => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(transactions, null, 2));
  } catch (error) {
    console.error("Could not save transactions to file:", error);
  }
};

// Загрузка данных при запуске сервера
loadTransactions();

// Обработка корневого маршрута
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

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
  saveTransactions(); // Сохранение данных после добавления
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
  saveTransactions(); // Сохранение данных после удаления

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
    saveTransactions(); // Сохранение данных после обновления
    res.json(updatedTransaction);
  } else {
    res.status(404).json({ error: "Transaction not found" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
