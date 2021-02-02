import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const baseStyle = {
  flex: 1,
  // width: 400,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#0BA6CF",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DocDropzone(props) {
  // const { form, handleChange } = props;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: "image/*" });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="flex flex-col space-y-4">
      <section className="container">
        <div {...getRootProps({ style })} className="space-x-2 w-full md:w-80">
          <input {...getInputProps()} />
          <CloudUploadIcon />
          <p>Upload Property Document</p>
        </div>
        <aside>
          <ul className="flex py-4">{files}</ul>
        </aside>
      </section>
    </div>
  );
}

export default DocDropzone;
