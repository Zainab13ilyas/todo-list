import { ChangeEvent, useState, useEffect } from 'react';
import { Box, Modal, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGlobalState } from '../store/todoStore';
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

type Todo = {
  id: string;
  text: string;
  completed?: boolean;
};

type TodoModalProps = {
  todoId: string | null;
  handleCloseModal: () => void;
};

const TodoModal = ({ todoId, handleCloseModal }: TodoModalProps) => {

  const classes = useStyles();
  const { todosState } = useGlobalState();
  const [text, setText] = useState('');

  useEffect(() => {
    if (todosState.value) {
      const selectedTodo = todosState.value.find(todo => todo.id === todoId);
      if (selectedTodo) {
        setText(selectedTodo.text)
      } else {
        setText('')
        handleCloseModal();
      }
    }
  }, [todoId, handleCloseModal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleUpdate = () => {
    todosState.set(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, text: text.trim() } : todo
      )
    );
    handleCloseModal();
  };
  return (
    <Modal open={Boolean(todoId)} onClose={handleCloseModal}>
      <Box className={classes.popUp} >
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

