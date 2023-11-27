import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import downloadAssignment from '../helpers/downloadAssignment';

export default function DownloadSubmissionBtn(props){
	console.log("right here");
	console.log(props.fileName)
    return (
    
        <div><Button component="label" variant="contained" onClick = {() => downloadAssignment(props.fileName)} startIcon={<DownloadIcon />}>{props.title}</Button></div>
        );
    }
    

