import { Box, Modal, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGlobalAlertState } from "store/AlertStateStore";

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
  subheadings: {
    "&&": {
      marginLeft: '60px',
      mb: '15px',
      fontWeight: 'bold',
    }
  },
  headings: {
    "&&": {
      marginLeft: '120px',
      mb: '15px',
      fontWeight: 'bold',
    }
  },
})

type AlertModalProps = {
  onClose: () => void;
};
const AlertModal = ({ onClose }: AlertModalProps) => {
  const classes = useStyles();
  const showAlert = useGlobalAlertState();

  return (
    < Modal open={showAlert.getValue()} onClose={onClose} >
      <Box className={classes.popUp} >
        <Typography variant="h6"
          className={classes.headings}
        >Alert!</Typography>
        <Typography
          variant="subtitle1"
          className={classes.subheadings}>
          This task already exists
        </Typography>
        <Button
          variant="outlined"
          className={classes.popUpButton}
          onClick={onClose}
        >
          OK
        </Button>
      </Box>
    </Modal >
  );
};

export default AlertModal;
// End of File (EOF)
