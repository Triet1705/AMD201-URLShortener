import React from "react";
import Button from "../../components/Button/Button";
import InputForm from "../../components/InputForm/InputForm";
import Box from "../../components/Box/Box";
import "./PreviewPage.css";

function PreviewPage() {
  const demoData = {
    shortenedUrl: "https://short-ly/xyz123",
    destinationUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    description:
      "The official video for “Never Gonna Give You Up” by Rick Astley...",
    createdDate: "2025-07-20",
  };
  return (
    <div className="container">
      <Box>
        <div className="form-container">
          <div className="group">
            <label className="text-title">Shortened URL</label>
            <InputForm />
          </div>
          <div className="group">
            <label className="text-title">Destination URL</label>
            <InputForm />
          </div>
          <div className="information-box">
            <div className="image-placeholder" />
            <div className="info-details">
              <p className="info-text">
                <strong>Title:</strong> <span>{demoData.title}</span>
              </p>
              <p className="info-text">
                <strong>Description:</strong>{" "}
                <span>{demoData.description}</span>
              </p>
              <p className="info-text">
                <strong>Created Date:</strong>{" "}
                <span>{demoData.createdDate}</span>
              </p>
            </div>
          </div>
          <div className="button-group">
            <Button>Back To Home</Button>
            <Button>Confirm Link</Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default PreviewPage;
