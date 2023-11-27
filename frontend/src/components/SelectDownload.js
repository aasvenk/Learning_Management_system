//Reusable component for presenting a list of download options to the user 
//takes care of sending download request
//props:
	// options := [ {
		// filename : string to present to user
		// filepath : string (filename on backend)
	// }
	// ]
	





import {
  Alert,
  Box,
  Button,
  Checkbox,
  OutlinedInput,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  TextareaAutosize,
  InputLabel, MenuItem, Select
} from "@mui/material";
import { useEffect, useState } from "react";
import getTheFileForMe from '../helpers/downloadAssignment.js';
import DownloadIcon from '@mui/icons-material/Download';

export default function SelectDownload(props) {
	 const [toGrab, setStudentSelection]  = useState([]);
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const updateSelection = (event) => {
	const {
      target: { value },
    } = event;
	
    setStudentSelection(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
}
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const options = props.options;
const executeDownloads = () => {
	for (let i = 0; i < toGrab.length; i ++) {
		getTheFileForMe(toGrab[i]);
	}
}
return (

<Box sx={{ textAlign: "center" }}>
                   <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Files To Download</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={toGrab}
          onChange={updateSelection}
		  renderValue = {(selected) => selected.join(',')}
          input={<OutlinedInput label="Tag" />}
          
          MenuProps={MenuProps}
        >
          {options.map((file,index) => (
            <MenuItem key={file.filename + index} value={file.filepath}>
              <Checkbox checked={toGrab.indexOf(file.filepath) > -1} />
              <ListItemText primary={file.filename} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
	  <div><Button component="label" variant="contained" onClick = {executeDownloads} startIcon={<DownloadIcon />}>Download Files</Button></div>
              </Box>



);






}