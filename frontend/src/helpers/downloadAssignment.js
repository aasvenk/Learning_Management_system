import axios from 'axios';


export default function download(filename){

const file_ext = filename.split('.').pop();
axios({
    url: '/assignment/file/' + filename,
    method: 'GET',
    responseType: 'blob',
    headers : {
        Authorization: 'Bearer ' + localStorage.getItem('hoosier_room_token')
      }
  })
    .then(response => {
		
    const options = "application/" + file_ext;
      const file = new Blob([response.data], {options});
      const href = window.URL.createObjectURL(file);

      const anchorElement = document.createElement('a');

      anchorElement.href = href;
      anchorElement.download = filename;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    }) 
    .catch(error => {
      console.log('error: ', error);
    });





}
