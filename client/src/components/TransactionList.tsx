import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  onEdit,
}) => {
  return (
    <Box
      sx={{
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
        Список расходов
      </Typography>
      <List>
        {transactions.map(transaction => (
          <ListItem
            key={transaction.id}
            sx={{ boxShadow: 1, marginBottom: 1, borderRadius: 2, padding: 1 }}
          >
            <Grid
              container
              spacing={1}
              alignItems='center'
            >
              <Grid
                item
                xs={8}
              >
                <ListItemText
                  primary={`${transaction.dateTime} - ${transaction.sum} - ${transaction.category}`}
                  secondary={transaction.comment}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ textAlign: "right" }}
              >
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
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransactionList;
