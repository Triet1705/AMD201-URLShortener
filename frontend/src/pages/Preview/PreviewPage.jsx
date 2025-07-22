import React, { useState } from "react";
import Button from "../../components/Button/Button";
import InputForm from "../../components/InputForm/InputForm";
import Box from "../../components/Box/Box";
import "./PreviewPage.css";
import { useNavigate } from "react-router-dom";
import { getUrlDetailsApi } from "../../utils/api";
import { message } from "antd";

function PreviewPage() {
  const [shortCode, setShortCode] = useState("");
  const [linkDetails, setLinkDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLinkDetails(null);
    setIsLoading(true);
    try {
      const data = await getUrlDetailsApi(shortCode);
      setLinkDetails(data);
    } catch (error) {
      message.error("Failed to fetch link details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleConfirm = () => {
    if (linkDetails?.longUrl) {
      window.open(linkDetails.longUrl, "_blank");
    }
  };
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
        <form onSubmit={handleSubmit} className="form-container">
          <div className="group">
            <label className="text-title">Shortened URL</label>
            <InputForm
              placeholder="Nhập link rút gọn hoặc mã code..."
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              required
            />
          </div>
          {linkDetails && (
            <>
              <div className="input-group">
                <label className="text-title">Destination URL</label>
                <InputForm value={linkDetails.longUrl} readOnly />
              </div>

              <div className="information-box">
                <img
                  src={
                    linkDetails.imageUrl ||
                    "https://placehold.co/120x90?text=No+Image"
                  }
                  alt={linkDetails.title}
                  className="image-placeholder"
                />
                <div className="info-details">
                  <p className="info-text">
                    <strong>Title:</strong>{" "}
                    <span>{linkDetails.title || "N/A"}</span>
                  </p>
                  <p className="info-text">
                    <strong>Description:</strong>{" "}
                    <span>{linkDetails.description || "N/A"}</span>
                  </p>
                  <p className="info-text">
                    <strong>Created Date:</strong>{" "}
                    <span>
                      {new Date(linkDetails.createdAtUtc).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
          <div className="button-group">
            <Button
              type="button"
              onClick={() => navigate("/")}
              className="secondary"
            >
              Back To Home
            </Button>
            {linkDetails ? (
              <Button type="button" onClick={handleConfirm}>
                Confirm Link
              </Button>
            ) : (
              <Button type="submit" loading={isLoading ? true : undefined}>
                Preview
              </Button>
            )}
          </div>
        </form>
      </Box>
    </div>
  );
}

export default PreviewPage;
