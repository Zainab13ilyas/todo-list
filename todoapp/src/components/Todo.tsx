import React from "react";
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

  const handleChange = (value: string) => {
    text.set(value);
  }
  const createTodo = () => {
    const newText = text.get().trim()
    const prevTodos = tasksList.get();
    if (selectedTodoState.value && prevTodos) {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === selectedTodoState.value) {
          return { ...todo, text: newText };
        }
        return todo;
      });

      tasksList.set(updatedTodos);
      selectedTodoState.set(null);
    } else {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newText,
        completed: false,
      };
      tasksList.set((prevTodos: Todo[]) => [...prevTodos, newTodo]);
    }

    text.set('');
  };

  const deleteTodo = (id: string) => {
    tasksList.set((prevTodos: Todo[]) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  const openModal = (id: string) => {
    selectedTodoState.set(id);
  };

  const closeModal = () => {
    selectedTodoState.set(null);
  };

  const toggleTodo = (id: string) => {
    const prevTodos = tasksList.get({ noproxy: true });
    if (prevTodos) {
      const todos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
      tasksList.set(todos);
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
                        <IconButton aria-label="edit" onClick={() => openModal(todo.id)}>
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
