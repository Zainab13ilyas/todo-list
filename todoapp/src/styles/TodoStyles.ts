import { makeStyles} from '@mui/styles';
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
      maxHeight: '350px',
      overflowY: 'auto',
      alignItems: 'center',
      padding: 0,
      boxShadow: 'none',
      border: 'none',
      outline: 'none',
    }
  },
  cardContent: {
    "&&": {
      alignItems: 'center',
      background: 'rgba(255, 205, 210, 0.25)',
      padding: 0,
      justifyContent: 'space-between',
      height: "85px",
    }
  },
  listItem: {
    "&&": {
      height: "85px", background: 'rgba(255, 205, 210, 0.25)'
    }
  },
  stacktwo: {
    "&&": {
      position: "absolute",
      width: "100%",
      left: 0,
      right: 0,
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
})

export default useStyles;
// End of File (EOF)