import { useEffect } from 'react';
import { Box, Modal, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHookstate } from '@hookstate/core';
import { Todo } from 'components/Constants';
import AlertModal from "components/AlertModal";

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
  onEditTodo: (id: string, text: string, completed: boolean) => void;
  onSetAlert: () => void;
  onDisableAlert: () => void;
  todos: Todo[];
  alertValue: boolean;
};

const TodoModal = ({ todoId, handleCloseModal, onEditTodo, onSetAlert, onDisableAlert, todos, alertValue }: TodoModalProps) => {
  const classes = useStyles();
  const text = useHookstate('');

  useEffect(() => {
    if (todos) {
      const selectedTodo = todos.find(todo => todo._id === todoId);
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
    const prevTodos = todos;
    const updatedTodos = prevTodos.map((todo) =>
      todo._id === todoId ? { ...todo, text: text.get().trim() } : todo
    );
    const selectedTodo = updatedTodos.find((todo) => todo._id === todoId);

    if (prevTodos) {
      if (prevTodos.find((todo) => todo.text === selectedTodo?.text && todo._id !== selectedTodo._id)) {
        onSetAlert()
        return;
      }
      if (selectedTodo) {
        onEditTodo(selectedTodo?._id, selectedTodo?.text, selectedTodo?.completed)
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

      {alertValue && (
        <AlertModal
          onClose={() => onDisableAlert()}
          alertValue={alertValue}
        />
      )}
    </>
  );
};

export default TodoModal;
// End of File (EOF)
