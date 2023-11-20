import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import downloadAssignment from '../helpers/downloadAssignment';

export default function download_submission_btn(fileName, file_ext){
    const downloadURL = '/downloadSubmission/' + fileName + '/' + file_ext;
   
    return (
    
        <div><Button component="label" variant="contained" onClick = {() => downloadAssignment(downloadURL, fileName, file_ext)} startIcon={<DownloadIcon />}>Download Submission</Button></div>
        );
    }
    

