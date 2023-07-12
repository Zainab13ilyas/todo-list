import { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Stack,
  IconButton, useMediaQuery,
  List, ListItem, ListItemText, Modal
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import background from "../assets/backdrop.jpg";

const useStyles = makeStyles({
  root: {
    "&&": {
      backgroundImage: `url(${background})`,
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  container: {
    "&&": {
      backgroundColor: '#ff5252',
      color: 'white',
      padding: '1rem',
      width: '30%',
      height: '70vh',
      boxShadow: '5px 5px 25px -5px rgba(0,0,0,0.5)',
      borderRadius: 0,
      margin: 'auto',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      "@media (min-width: 768px)": {
        width: "40%",
      },
      "@media (min-width: 1592px)": {
        width: "30%",
      },
    }

  },
  firststack: {
    "&&": {
      marginBottom: '40px'
    }
  },
  headings: {
    "&&": {
      marginLeft: '50px',
      marginTop: '15px',
      fontWeight: 'bold',
    }
  },
  subheadings: {
    "&&": {
      marginLeft: '60px',
      mb: '15px',
      fontWeight: 'bold',
    }
  },
  hr: {
    "&&": {
      margin: 'center',
      marginInlineStart: '7%',
      marginInlineEnd: '7%',
    }
  },
  card: {
    "&&": {
      background: '#ff5252',
      maxHeight: '300px',
      overflowY: 'auto',
      marginBottom: "10px",

    }
  },
  cardContent: {
    "&&": {
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(255, 205, 210, 0.25)',
    }
  },
  stacktwo: {
    "&&": {
      position: "absolute",
      width: "100%",
      left: 0,
    }
  },
  taskName: {
    "&&": {
      color: "white",
      marginLeft: "50px",
      cursor: "pointer"
    }
  },
  newTodo: {
    "&&": {
      position: 'absolute',
      bottom: '50px',
      width: '100%',
      flexDirection: 'column',
      marginLeft: '60px',
      marginRight: '50px',
      overflowY: 'auto',
    }
  },
  todoHeading: {
    "&&": {
      mb: '5px',
      fontWeight: 'bold',
    }
  },
  todoContainer: {
    "&&": {
      gap: '0.4rem',
      marginRight: '60px',
      display: 'flex',
    }
  },
  todoTextField: {
    "&&": {
      width: '60%',
      fontWeight: 'bold',
      borderRadius: 0,
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#ff5252',
        },
      },
      "@media (max-width: 600px)": {
        todoTextField: {
          width: '50%',
        }
      }
    }
  },
  todoButton: {
    "&&": {
      backgroundColor: '#ff5252',
      borderColor: 'white',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: 0,
      '&:hover': {
        backgroundColor: 'black',
      },
      '&:focus': {
        outlineColor: '#ff5252',
      },
      "@media (max-width: 600px)": {
        todoButton: {
          width: '100%',
        }
      }
    }
  },
  popUp: {
    "&&": {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      width: '300px',
      p: '1rem',
      borderRadius: '8px',
    }
  },
  popUpButton: {
    "&&": {
      width: '100%',
      backgroundColor: '#ff5252',
      color: 'white'
    }
  }
})

type Todo = {
  id: string;
  text: string;
  completed: boolean
};

function Todos(): JSX.Element {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("fdfd")

    setText(e.target.value);
  }
  const createTodo = (e: FormEvent) => {
    e.preventDefault();
    setText("");

    if (text.trim() === '') {
      return;
    }

    if (selectedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === selectedTodo.id) {
            return { ...todo, text: text.trim() };
          }
          return todo;
        })
      );
      setSelectedTodo(null);
    } else {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    setText('');
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setText(todo.text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setText('');
    setIsModalOpen(false);
  };
  const updateTodo = () => {
    if (selectedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === selectedTodo.id) {
            return { ...todo, text: text.trim() };
          }
          return todo;
        })
      );
      closeModal();
    }
  };
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  };
  return (
    <Stack className={classes.root}>
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
          {todos.length > 0 && (
            <Card
              variant="outlined"
              className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Box sx={{ marginRight: "50px" }}>
                  <List >
                    {todos.map((todo) => (
                      <ListItem key={todo.id} >
                        <ListItemText primary={todo.text} className={classes.taskName} onClick={() => toggleTodo(todo.id)} sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                        />
                        <IconButton aria-label="edit" onClick={() => openModal(todo)}>
                          <EditIcon sx={{ color: "white" }} />
                        </IconButton>
                        <IconButton aria-label="delele" onClick={() => deleteTodo(todo.id)}>
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
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
              value={text}
              sx={{ width: isSmallScreen ? "50%" : "60%", }}
              onChange={handleChange}
            />
            <Button
              variant="outlined"
              size="large"
              sx={{ width: isSmallScreen ? '100%' : 'auto' }}
              className={classes.todoButton}
              onClick={createTodo}
            >
              Add Todo
            </Button>
          </Box>
        </Stack>
        <Modal open={isModalOpen} >
          <Box className={classes.popUp}
          >
            <TextField
              label="Edit Todo"
              variant="outlined"
              onChange={handleChange}
              type="text"
              value={text}
              sx={{ width: '100%', mb: '1rem' }}
            />
            <Button
              variant="outlined"
              className={classes.popUpButton}
              onClick={updateTodo}
            >
              Update Todo
            </Button>
          </Box>
        </Modal>
      </Box>
    </Stack>
  );
}

export default Todos;
// End of File (EOF)
