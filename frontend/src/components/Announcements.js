// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// export default function BasicAccordion() {
//   return (
//     <div>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography>Module 1</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2a-content"
//           id="panel2a-header"
//         >
//           <Typography>Ac 2</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion disabled>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3a-content"
//           id="panel3a-header"
//         >
//           <Typography>Disabled Accordion</Typography>
//         </AccordionSummary>
//       </Accordion>
//     </div>
//   );
// }
// export default BasicAccordion;


// import React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// function MyComponent() {
//   const a = [
//     {
//       des: 'Be Happy',
//       modu: 'Module 1',
//     },
//     // Add more objects to the 'a' array as needed
//   ];

//   return (
//     <div>
//       {a.map((d) => (
//         <Accordion key="">
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography>{d.modu}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>{d.des}</Typography>
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </div>
//   );
// }

// export default MyComponent;


import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ModuleForm = ({onHandleSubmit}) => {
  const [module, setModule] = useState('');

  const handleSubmit = () => {
    if (module) {
      onHandleSubmit(module);
      setModule('');
    }
  };

  return (
    <div>
      <TextField
        label="type Announcement here"
        variant="outlined"
        fullWidth
        value={module}
        onChange={(e) => setModule(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '1rem' }}
      >
        Create Announcement
      </Button>
    </div>
  );
};

export default ModuleForm;
