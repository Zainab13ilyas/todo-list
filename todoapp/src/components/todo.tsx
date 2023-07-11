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
          position: 'relative' ,
          '@media (min-width: 768px)': {
            width: '60%',
          },
          '@media (min-width: 1024px)': {
            width: '30%',
          },
         // flexWrap: 'wrap',

        }}
      >
        <Stack  direction="column">
          <Typography variant="h2" sx={{ ml: '50px' , mt:'15px',fontWeight:'bold'}}>Todo List</Typography>
          <Typography variant="subtitle1"sx={{ marginLeft: '60px', mb:'15px', fontWeight:'bold'}}>A simple React Todo List App</Typography>
          <hr style={{  margin:'center',marginInlineStart: '7%', marginInlineEnd: '7%'  }} />
        </Stack>

        <Stack  direction="column"
          sx={{
           //gap: '50rem',
           position:'absolute',
           width:'100%',
           left:0
           
          }}
        >
          <Card
            variant="outlined"
            sx={{background:'#ff5252',maxHeight:'300px', overflowY: 'auto'}}
          >
            <CardContent sx={{
                 display:"flex", alignItems: 'center', justifyContent: 'space-between' ,background: "rgba(255, 205, 210, 0.25)"        }}>
               <Typography variant="h5" component="h2" color="white" marginLeft="50px">
                 Task 1
               </Typography>
               <Box marginRight='50px'>
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
            //mt:'330px',
            position: 'absolute',
            bottom: '50px',
            //left: '35%',
            //transform: 'translateX(-50%)',
            width: '100%',
            flexDirection: 'column',
          }}>
          <Typography variant="h6" sx={{ marginLeft:  '60px',mb:'5px',fontWeight: 'bold' }}>New Todo</Typography>
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
             <TextField label={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      New Todo
                    </Typography>}
                    variant="outlined" font-Weight='Bold'sx={{ marginLeft: '60px', width:' 330px', fontWeight:'Bold',
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
              fontWeight: 'bold' ,
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