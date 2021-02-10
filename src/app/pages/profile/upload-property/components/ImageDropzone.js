import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  width: 200,
  height: 200,
  display: "flex",
  flexDirection: "column",
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

function ImageDropzone(props) {
  const { form, handleImageUpload } = props;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    // acceptedFiles,
  } = useDropzone({
    accept: "image/*, *.pdf, *.doc",
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      handleImageUpload(files);
    },
  });

  const files = form.images.map((file, i) => (
    <li key={i}>
      <img
        src={`data:image/jpg;base64,${file.encodedString}`}
        alt=""
        className="h-40"
      />
    </li>
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
        <div {...getRootProps({ style })} className="space-y-2">
          <input {...getInputProps()} />
          <img
            className="h-10"
            src="/assets/images/profile/upload.svg"
            alt="upload-icon"
          />
          <p>Upload Images</p>
        </div>
        <p className="text-xs text-red-600 mt-4">
          Note : Images must not be more than 5mb each and only a maximum of 20
          images can be added
        </p>

        <aside>
          <ul className="flex py-4">{files}</ul>
        </aside>
      </section>
    </div>
  );
}

export default ImageDropzone;
