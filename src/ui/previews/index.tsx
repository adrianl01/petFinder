import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as css from "./style.css";
import { useSetRecoilState } from "recoil";
import { imgInfo } from "../../atoms";

export function Previews(props) {
  const setImgInfoAtom = useSetRecoilState(imgInfo);

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles[0].name);
      const imgEl = document.getElementById("initialImg") as any;
      imgEl.style.display = "none";
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setImgInfoAtom(acceptedFiles[0]);
    },
  });

  const thumbs = files.map((file) => (
    <div className={css.thumb} key={file.name}>
      <div className={css.thumbInner}>
        <img
          src={file.preview}
          className={css.img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  const img = props.petImgEdit || "/imgs/insert-photo.png";
  return (
    <section className={css.container}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className={css.initImg} id="initialImg">
          <img id="imgIng" className={props.imgIngresar} src={img} />
          <p className={css.text}>
            Arrastra o haz click en la imagen para subir la de tu mascota🐕🐈
          </p>
        </div>
      </div>
      <aside className={css.thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
