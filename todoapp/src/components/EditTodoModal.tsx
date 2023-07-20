import { useEffect, useState } from 'react';
import { Box, Modal, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGlobalState } from 'store/TodoStore';
import { useHookstate } from '@hookstate/core';
import { crudAPI, Todo } from 'components/Constants';
import AlertModal from "./AlertModal";
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
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (tasksList.value) {
      const selectedTodo = tasksList.value.find(todo => todo._id === todoId);
      if (selectedTodo) {
        text.set(selectedTodo.text)
      } else {
        text.set('')
        handleCloseModal();
      }
    }
  }, [todoId, handleCloseModal]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (value: string) => {
    text.set(value);
  };

  const handleUpdate = async () => {
    const prevTodos = tasksList.get({ noproxy: true });
    const updatedTodos = prevTodos.map((todo) =>
      todo._id === todoId ? { ...todo, text: text.get().trim() } : todo
    );
    const selectedTodo = updatedTodos.find((todo) => todo._id === todoId);

    if (prevTodos) {
      if (prevTodos.find((todo) => todo.text === selectedTodo?.text && todo._id !== selectedTodo._id)) {
        setShowAlert(true)
        return;
      }
      tasksList.set(updatedTodos);

      if (selectedTodo) {
        const { completed, text } = selectedTodo;
        const updatedTodo: Partial<Todo> = { completed, text };
        try {
          await axios.put(`${crudAPI}/${selectedTodo._id}`, updatedTodo);
        } catch (error) {
          console.error(error);
        }
      }

      handleCloseModal();
    }
  };

  return (
    <>
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

      {showAlert && (
        <AlertModal
          open={showAlert}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default TodoModal;
// End of File (EOF)

