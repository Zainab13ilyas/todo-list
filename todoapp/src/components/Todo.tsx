import React, { useEffect } from "react";
import {
  TextField,
  Card,
  Box,
  Typography,
  Button,
  Stack,
  IconButton, useMediaQuery,
  List, ListItem, ListItemText
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from 'styles/TodoStyles';
import { useHookstate } from "@hookstate/core";
import axios from "axios";
import { crudAPI, Todo } from 'components/Constants';
import AlertModal from "components/AlertModal";
import EditTodoModalContainer from "containers/EditTodoModalContainer";


type TodosProps = {
  todos: Todo[];
  alertValue: boolean;
  onAddTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onSetAlert: () => void;
  onDisableAlert: () => void;
  fetchTodos: () => void;
};

const Todos = ({ todos, onAddTodo, onDeleteTodo, onToggleTodo, alertValue, onSetAlert, onDisableAlert, fetchTodos
}: TodosProps) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  const text = useHookstate("");
  const selectedTodoState = useHookstate<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (value: string) => {
    text.set(value);
  }

  const createTodo = async () => {
    const newText = text.get().trim();
    const isDuplicate = todos.some((todo) => todo.text === newText);
    if (isDuplicate) {
      onSetAlert();
      return;
    }
    const newTodo = {
      text: newText,
      completed: false,
    };
    try {
      const response = await axios.post(crudAPI, newTodo);
      const createdTodo = response.data;
      onAddTodo(createdTodo._id, createdTodo.text);
    } catch (error) {
      console.error(error);
    }
    text.set("");
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${crudAPI}/${id}`);
      onDeleteTodo(id);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    selectedTodoState.set(null);
  };

  const handleToggle = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    if (todoToUpdate) {
      const { completed, text } = todoToUpdate;
      const updatedTodoToPut: Partial<Todo> = { completed: !completed, text };
      try {
        await axios.put(`${crudAPI}/${id}`, updatedTodoToPut, {
          headers: { 'Content-Type': 'application/json' }
        });
        onToggleTodo(id)
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Stack className={classes.root} >
      <Box
        component="div" className={classes.container}
      >
        <Stack direction="column" className={classes.firststack}>
          <Typography
            variant="h2"
            className={classes.headings}>
            Todo List
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.subheadings}>
            A simple React Todo List App
          </Typography>
          <hr
            className={classes.hr} />
        </Stack>

        <Stack
          direction="column"
          className={classes.stacktwo}
        >
          {todos.length && (
            <Card
              variant="outlined"
              className={classes.card}>
              <List >
                {todos.map((todo: Todo, index: number) => (
                  <React.Fragment key={todo._id}>
                    <ListItem key={todo._id} className={classes.listItem}>
                      <ListItemText primary={todo.text} className={classes.taskName} onClick={() => handleToggle(todo._id)} sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                      />
                      <Box sx={{ marginRight: "50px" }}>
                        <IconButton aria-label="edit" onClick={() => selectedTodoState.set(todo._id)}>
                          <EditIcon sx={{ color: "white" }} />
                        </IconButton>
                        <IconButton aria-label="delele" onClick={() => handleDelete(todo._id)}>
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Box>
                    </ListItem>
                    {index !== todos.length - 1 && (
                      <Box sx={{ marginBottom: '5px' }} />
                    )
                    }

                  </React.Fragment>
                ))}
              </List>
            </Card>
          )}
        </Stack>

        <Stack
          direction="column"
          className={classes.newTodo}
        >
          <Typography
            variant="h6"
            className={classes.todoHeading}>
            New Todo
          </Typography>
          <Box className={classes.todoContainer}
          >
            <TextField
              label={
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} >
                  New Todo
                </Typography>
              }
              variant="outlined"
              className={classes.todoTextField}
              value={text.value}
              sx={{ width: isSmallScreen ? "50%" : "60%", }}
              onChange={(e) => handleChange(e.target.value)}
            />
            <Button
              variant="outlined"
              size="large"
              sx={{ width: isSmallScreen ? '100%' : 'auto' }}
              className={classes.todoButton}
              disabled={!text.value}
              onClick={(e) => {
                e.preventDefault();
                createTodo();
              }}
            >
              Add Todo
            </Button>
          </Box>
        </Stack>

        <EditTodoModalContainer
          todoId={selectedTodoState.value}
          handleCloseModal={closeModal}
        />
        {alertValue && (
          <AlertModal
            onClose={() => onDisableAlert()}
            alertValue={alertValue}
          />
        )}
      </Box >
    </Stack >
  );
}

export default Todos;
// End of File (EOF)
