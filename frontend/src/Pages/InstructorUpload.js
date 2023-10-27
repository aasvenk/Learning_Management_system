import AppHeader from "../components/AppHeader";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './InstructorUpload.css'
function InstructorUpload() {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
    

    return (
            <div>
                <div> 
                    <AppHeader />
                </div>
            <div className="instructor-upload-page">
            <div className="instructor-upload">
            <h1>Please Upload Class Materials here</h1>
            </div>
            <div>
              <div>
            <Button className = "Upload" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button> 
            </div>
            </div> 
            </div>
            </div>
    );
}
export default InstructorUpload;
