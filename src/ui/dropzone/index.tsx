import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function MyDropzone(prop) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);

    if (acceptedFiles[0]) {
      const img = document.getElementById("imgIng") as any;

      img.src = acceptedFiles[0].path;
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          <img
            id="imgIng"
            className={prop.imgIngresar}
            src="../imgs/insert-photo.png"
          />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </div>
  );
}
