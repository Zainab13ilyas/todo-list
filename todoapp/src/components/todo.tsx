import React, { useState } from 'react';
import {
  Container,
  TextField,
  List,
  Card,
  CardContent,
  colors,
  Box,
  Typography, Button, Stack,
  IconButton,
} from '@mui/material';
//import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import background from '../images/back.jpg'


function Todos(): JSX.Element {
  const myStyle={
    backgroundImage: `url(${background})` ,
    height:'100vh',
    //marginTop:'-20px',
    //fontSize:'50px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={myStyle}> 
    
      <Box
        component="div"
        sx={{
          backgroundColor: '#ff5252',
          color: 'white',
          padding: '1rem',
          width: '30%',
	        height: '70vh',
          boxShadow: '5px 5px 25px -5px rgba(0,0,0,0.5)',
	        borderRadius: '15px',
          margin:"auto",
          align:'centre',
          textAlign:'left',
          justifyContent: 'space-between',
         // flexWrap: 'wrap',

        }}
      >
        <Stack  direction="column">
          <Typography variant="h2" sx={{ ml: '50px' , mt:'15px'}}>Todo List</Typography>
          <Typography variant="subtitle1"sx={{ marginLeft: '60px', mb:'15px' }}>A simple React Todo List App</Typography>
          <hr style={{  margin:'center',marginInlineStart: '7%', marginInlineEnd: '7%'  }} />
        </Stack>

        <Stack  direction="column"
          sx={{
            gap: '50rem',
          }}
        >
          <Card
            className="root"
            variant="outlined"
            sx={{ background: "rgba(255, 205, 210, 0.25)"  }}
          >
            <CardContent sx={{
display: 'flex', alignItems: 'center', justifyContent: 'space-between'               }}>
               <Typography variant="h5" component="h2" color="white">
                 Task 1
               </Typography>
               <Box>
               <IconButton aria-label="edit">
                  <EditIcon sx={{color:"white"}}/>
               </IconButton>
               <IconButton aria-label="delele">
                  <DeleteIcon sx={{color:"white"}}/>
               </IconButton>
               </Box>
            </CardContent>

          </Card>




        </Stack>  
        <Stack  direction="column" 
           sx={{
            //display: 'flex',
            mt:'330px',
            flexDirection: 'column',
          }}>
          <Typography variant="h6" sx={{ marginLeft: '60px',mb:'5px'}}>New Todo</Typography>
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
             <TextField label="New Todo" variant="outlined" sx={{ marginLeft: '60px',
             '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
             '&:hover fieldset': {
              borderColor: 'white',
              },
             '&.Mui-focused fieldset': {
              borderColor: '#ff5252',
              },
              },}}/>
             <Button variant="outlined" size="large" sx={{
              backgroundColor: '#ff5252',
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                backgroundColor: 'black',
              },
              '&:focus': {
                outlineColor: '#ff5252',
              },
            }}>Add Todo</Button>
          </Box>
          

        </Stack>


      </Box>
    </div>
  );
}

export default Todos;