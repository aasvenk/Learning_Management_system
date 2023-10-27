import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Modules() {
  const a = [
    {
      des: 'Be Happy',
      modu: 'Module 1',
    },
    // Add more objects to the 'a' array as needed
  ];

  const ModuleForm = ({onHandleSubmit}) => {
    const [module1, setModule] = useState('');
  
    const handleSubmit = () => {
      if (module1) {
        onHandleSubmit(module1);
        setModule('');
      }
    };

  return (
    <div>
      {a.map((d) => (
        <Accordion key="hgchgch">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{d.modu}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{d.des}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      
      <TextField
        label="enter module description"
        variant="outlined"
        fullWidth
        value={module1}
        onChange={(e) => setModule(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '1rem' }}
      >
        Create Module
      </Button>


    </div>
  );
      }
}

export default Modules;
