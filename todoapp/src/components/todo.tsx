import React, { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Stack,
  IconButton, useMediaQuery
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
    }
  },
  cardContent: {
    "&&": {
      display: 'flex',
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
  }
})


function Todos(): JSX.Element {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
          className={classes.stacktwo}>
          <Card
            variant="outlined"
            className={classes.card}>
            <CardContent
              className={classes.cardContent}>
              <Typography
                variant="h5"
                component="h2"
                className={classes.taskName}>
                Task 1
              </Typography>
              <Box sx={{ marginRight: "50px" }}>
                <IconButton aria-label="edit">
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton aria-label="delele">
                  <DeleteIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
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
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  New Todo
                </Typography>
              }
              variant="outlined"
              className={classes.todoTextField}
              sx={{ width: isSmallScreen ? "50%" : "60%", }}
            />
            <Button
              variant="outlined"
              size="large"
              sx={{ width: isSmallScreen ? '100%' : 'auto' }}
              className={classes.todoButton}
            >
              Add Todo
            </Button>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default Todos;
// End of File (EOF)
