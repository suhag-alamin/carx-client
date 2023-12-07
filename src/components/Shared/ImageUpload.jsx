import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const ImageUpload = ({ name, onChange, multiple }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const url = import.meta.env.VITE_CLOUDINARY_URL;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple,
    onDrop: async (acceptedFiles) => {
      setUploading(true);
      const uploaded = [];
      // eslint-disable-next-line prefer-const
      for (let file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const res = await axios.post(url, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        });
        uploaded.push(res.data.url);
      }

      setUploadedImages(uploaded);
      if (onChange) onChange(name, uploaded);
      setUploading(false);
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "1px dashed",
        borderColor: "primary.main",
        borderRadius: 2,
        py: 2,
        px: 2,
      }}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <LinearProgressWithLabel value={progress} />
      ) : uploadedImages.length > 0 ? (
        uploadedImages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt=""
            style={{
              width: "80px",
              height: "80px",
              margin: "5px",
              borderRadius: "5px",
            }}
          />
        ))
      ) : (
        <p>
          Drag &apos;n&apos; drop
          {multiple ? " some images " : " image "}
          here, or click to select {multiple ? " images " : " image "}
        </p>
      )}
    </Box>
  );
};

export default ImageUpload;
