
import FileUpload from "../components/FileUpload";

function TestPage() {
  return (
    <div>
      <FileUpload 
        moduleId={1}
        courseId={1}
        uploadPath="/module/file/upload" 
        onfileUpload={(file) => console.log(file)}/>
        <a rel="noreferrer" href={process.env.REACT_APP_BASE_URL + '/module/file/sample.pdf'} target="_blank">sample.pdf</a>
    </div>
  );
}

export default TestPage;
