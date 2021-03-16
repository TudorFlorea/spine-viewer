import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {getExtension} from '../../utils/fileUtils';

const missingFiles = (files) => {
    const expectedTypes = ["json", "atlas", "png"];
    const missingFiles = [];
    expectedTypes.forEach(type => {
      if(files.find(elem => elem.type === type) === undefined) {
        missingFiles.push(type);
      }
      // if(!files.hasOwnProperty(type)) {
      //   missingFiles.push(type);
      // }
    });
    return missingFiles;
};

const DropZone = (props) => {

  const {onFilesLoaded, onError} = props;

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    // const files = {};
    const files = [];
    console.log(acceptedFiles);
    acceptedFiles.forEach((file, i, arr) => {
        const extension = getExtension(file.name);
        const reader = new FileReader();

        reader.onabort = () => {
          const message = `${file.name} reading was aborted`;
          onError(message);
        }
        reader.onerror = () => {
          const message = `${file.name} reading was aborted`;
          onError(message);
        }
        reader.onload = () => {
          const result = reader.result
          console.log(result)
          files.push({
            type: extension,
            data: reader.result,
            name: file.name,
            path: file.path
          });
          if (files.length === arr.length) {
            const missing = missingFiles(files);
            if (missing.length === 0) {
              console.log("all files");
              onFilesLoaded(files);
            } else {
              console.log("not all files", missing, files);
              const message = `The following files are missing ${missing.join(", ")}`;
              onError(message);
            }
          }
        }
        console.log(file);
        
        switch(extension) {
            case "json":
                reader.readAsText(file)
                break;
            case "atlas":
                reader.readAsText(file)
                break;
            case "png":
                reader.readAsDataURL(file)
                break;
            default:
                console.log("Unsopported file format: ", extension);
        }
      })
      
  }, [onFilesLoaded, onError])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className={`dropzone ${props.className ? props.className : ""} ${isDragActive ? "dropzone--active" : "" }`} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default DropZone;