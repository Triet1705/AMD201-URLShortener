import React, { useState } from "react";
import Box from "../../components/Box/Box";
import InputForm from "../../components/InputForm/InputForm";
import Button from "../../components/Button/Button";
import "./HomeView.css";
import Switch from "../../components/Switch/Switch";
import { shortenUrlApi } from "../../utils/api";
import { message } from "antd";
import { validateUrlFormat } from "../../utils/validators";

function HomeView() {
  const [longUrl, setLongUrl] = useState("");
  const [isCustomizeOn, setIsCustomizeOn] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    // const isValid = validateUrlFormat(longUrl);
    // if (!isValid) {
    //   setError("Invalid URL format");
    //   message.error("Invalid URL format");
    //   return;
    // }
    event.preventDefault();
    setError("");
    setShortenedUrl("");

    try {
      const data = await shortenUrlApi(
        longUrl,
        isCustomizeOn ? customCode : null
      );

      setShortenedUrl(data.shortUrl);
      setLongUrl("");
      setCustomCode("");
      setIsCustomizeOn(false);
    } catch (err) {
      setError("Failed to shorten the URL. Please try again.");
      message.error("API call failed:" + err.message);
    }
  };
  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl).then(() => {
        setTimeout(() => setCopyButtonText("Copy"), 2000);
      });
      message.success("Shortened URL copied to clipboard!").catch((err) => {
        message.error("Failed to copy text: " + err.message);
      });
    }
  };
  return (
    <div className="home-container">
      <form onSubmit={handleSubmit}>
        <Box>
          <div className="form-container">
            <label className="box-title">Paste your long URL</label>
            <InputForm
              type="url"
              placeholder="https://example.com/your-very-long-url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />

            <div className="customize-container">
              <Switch
                checked={isCustomizeOn}
                onChange={() => setIsCustomizeOn(!isCustomizeOn)}
              />
              <label className="box-title">Customize your URL</label>
            </div>

            {isCustomizeOn && (
              <div className="custom-input-group">
                <span className="input-prefix">Https://Short-ly/</span>
                <InputForm
                  type="text"
                  placeholder="your-custom-code"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="customize"
                />
              </div>
            )}
            {error && <p className="error-message">{error}</p>}
            <div className="button-action">
              <Button type="submit">Shorten URL</Button>
            </div>
          </div>
        </Box>
      </form>

      {shortenedUrl && (
        <Box className="result-box">
          <div className="form-container">
            <label className="box-title">Shortened URL</label>
            <div className="result-group">
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="result-link"
              >
                {shortenedUrl}
              </a>
              <Button type="button" onClick={handleCopy}>
                Copy
              </Button>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}

export default HomeView;
