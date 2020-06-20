import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {getExtension} from '../../utils/fileUtils';
import {dispatchFilesLoaded} from '../../services/events';

const missingFiles = (files) => {
    const expectedTypes = ["json", "atlas", "png"];
    const missingFiles = [];
    expectedTypes.forEach(type => {
      if(!files.hasOwnProperty(type)) {
        missingFiles.push(type);
      }
    });
    return missingFiles;
};

const DropZone = (props) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const files = {};
    acceptedFiles.forEach((file, i, arr) => {
        const extension = getExtension(file.name);
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
        // Do whatever you want with the file contents
          const result = reader.result
          console.log(result)
          files[extension] = reader.result;
          if (i === arr.length - 1) {
            const missing = missingFiles(files);
            if (missing.length === 0) {
              console.log("all files");
              dispatchFilesLoaded(files)
            } else {
              console.log("not all files", missing, files);
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
        //reader.readAsText(file)
      })
      
  }, [])
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