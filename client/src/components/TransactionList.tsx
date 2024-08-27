import React from "react";
import {
  Box,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

type Transaction = {
  id: number;
  dateTime: string;
  author: string;
  sum: number;
  category: string;
  comment: string;
};

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  onEdit: (transaction: Transaction) => void;
  isListVisible: boolean;
  toggleListVisibility: () => void;
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  onEdit,
  isListVisible,
  toggleListVisibility,
}) => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Typography
          variant='h6'
          gutterBottom
        >
          Список расходов
        </Typography>
        <IconButton onClick={toggleListVisibility}>
          {isListVisible ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {isListVisible && (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 450 }}
            aria-label='transaction table'
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                  ID
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                  Date
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                  Sum
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                  Category
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                  Comment
                </TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                    {transaction.id}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                    {transaction.dateTime}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                    {transaction.sum}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                    {transaction.category}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>
                    {transaction.comment}
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label='edit'
                      onClick={() => onEdit(transaction)}
                      size='small'
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      onClick={() => onDelete(transaction.id)}
                      size='small'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TransactionList;
