import React, { useState } from "react";
import Box from "../../components/Box/Box";
import InputForm from "../../components/InputForm/InputForm";
import Button from "../../components/Button/Button";
import "./HomeView.css";
import Switch from "../../components/Switch/Switch";
import { shortenUrlApi } from "../../utils/api";

function HomeView() {
  const [longUrl, setLongUrl] = useState("");
  const [isCustomizeOn, setIsCustomizeOn] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
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
      console.error("API call failed:", err);
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
            <div className="custom-input-group">
              <InputForm value={shortenedUrl} readOnly />
              <Button type="button">Copy</Button>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}

export default HomeView;
