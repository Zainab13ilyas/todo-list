import { useEffect } from 'react';
import { Box, Modal, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGlobalState } from 'store/TodoStore';
import { useHookstate } from '@hookstate/core';
import axios from 'axios';

const useStyles = makeStyles({
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
      padding: 15
    }
  },
  popUpButton: {
    "&&": {
      width: '100%',
      backgroundColor: '#ff5252',
      color: 'white',
      '&:hover': {
        backgroundColor: 'black',
        color: 'white',
      },
    }
  },
})

type TodoModalProps = {
  todoId: string | null;
  handleCloseModal: () => void;
};

const TodoModal = ({ todoId, handleCloseModal }: TodoModalProps) => {

  const classes = useStyles();
  const { tasksList } = useGlobalState();
  const text = useHookstate('');
  const crudAPI = "https://crudcrud.com/api/ca64b1d6f8a443368e5156edb5cefc9d/todos"

  useEffect(() => {
    if (tasksList.value) {
      const selectedTodo = tasksList.value.find(todo => todo.id === todoId);
      if (selectedTodo) {
        text.set(selectedTodo.text)
      } else {
        text.set('')
        handleCloseModal();
      }
    }
  }, [todoId, handleCloseModal]);

  const handleChange = (value: string) => {
    text.set(value);
  };

  const handleUpdate = async () => {
    const prevTodos = tasksList.get({ noproxy: true });

    if (prevTodos) {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: text.get().trim() } : todo
      );
      tasksList.set(updatedTodos);

      const selectedTodo = prevTodos.find((todo) => todo.id === todoId);
      if (selectedTodo) {
        try {
          await axios.put(`${crudAPI}/${selectedTodo.id}`, selectedTodo);
        } catch (error) {
          console.error(error);
        }
      }

      handleCloseModal();
    }
  };

  return (
    <Modal open={Boolean(todoId)} onClose={handleCloseModal}>
      <Box className={classes.popUp} >
        <TextField
          label="Edit Todo"
          variant="outlined"
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          value={text.value}
          sx={{ width: '100%', mb: '1rem' }}
        />
        <Button
          variant="outlined"
          onClick={handleUpdate}
          className={classes.popUpButton}
        >
          Update Todo
        </Button>
      </Box>
    </Modal>
  );
};

export default TodoModal;
// End of File (EOF)

