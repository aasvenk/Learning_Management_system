import axios from 'axios';


export default function download(downloadURL, fileName, file_ext){
axios({
    url: downloadURL,
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
      anchorElement.download = fileName + file_ext;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    }) 
    .catch(error => {
      console.log('error: ', error);
    });





}
