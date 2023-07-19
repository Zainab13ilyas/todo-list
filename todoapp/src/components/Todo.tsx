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
import TodoModal from 'components/EditTodoModal';
import { useGlobalState } from "store/TodoStore";
import useStyles from 'styles/TodoStyles';
import { useHookstate } from "@hookstate/core";
import axios from "axios";

type Todo = {
  id: string;
  text: string;
  completed: boolean
}

const Todos = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  const { tasksList } = useGlobalState();
  const text = useHookstate("");
  const selectedTodoState = useHookstate<string | null>(null);
  const crudAPI = "https://crudcrud.com/api/ca64b1d6f8a443368e5156edb5cefc9d/todos"

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(crudAPI);
      const todos = response.data;
      tasksList.set(todos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value: string) => {
    text.set(value);
  }
  const createTodo = async () => {
    const newText = text.get().trim()
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newText,
      completed: false,
    };
    try {
      const response = await axios.post(crudAPI, newTodo);
      const createdTodo = response.data;
      const todoId = createdTodo._id;
      newTodo.id = todoId;
      tasksList.set((prevTodos: Todo[]) => [...prevTodos, newTodo]);
      text.set("");
      await axios.put(`${crudAPI}/${todoId}`, newTodo);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${crudAPI}/${id}`);
      tasksList.set((prevTodos: Todo[]) =>
        prevTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    selectedTodoState.set(null);
  };

  const toggleTodo = async (id: string) => {
    const prevTodos = tasksList.get({ noproxy: true });
    if (prevTodos) {
      const todoToUpdate = prevTodos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
        try {
          await axios.put(`${crudAPI}/${id}`, updatedTodo);
          const updatedTodos = prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo));
          tasksList.set(updatedTodos);
        } catch (error) {
          console.error(error);
        }
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
          {tasksList.value.length && (
            <Card
              variant="outlined"
              className={classes.card}>
              <List >
                {tasksList.value.map((todo: Todo, index: number) => (
                  <React.Fragment key={todo.id}>
                    <ListItem key={todo.id} className={classes.listItem}>
                      <ListItemText primary={todo.text} className={classes.taskName} onClick={() => toggleTodo(todo.id)} sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                      />
                      <Box sx={{ marginRight: "50px" }}>
                        <IconButton aria-label="edit" onClick={() => selectedTodoState.set(todo.id)}>
                          <EditIcon sx={{ color: "white" }} />
                        </IconButton>
                        <IconButton aria-label="delele" onClick={() => deleteTodo(todo.id)}>
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Box>
                    </ListItem>
                    {index !== tasksList.value.length - 1 &&
                      <Box sx={{ marginBottom: '5px' }} />
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

        <TodoModal
          todoId={selectedTodoState.value}
          handleCloseModal={closeModal}
        />

      </Box >
    </Stack >
  );
}

export default Todos;
// End of File (EOF)
