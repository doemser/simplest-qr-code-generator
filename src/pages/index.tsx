import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the QRCode component so it only renders on the client side
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

export default function Home() {
  const [url, setUrl] = useState("https://doemser.de");

  const downloadSVG = () => {
    const container = document.getElementById("qr-code-container");
    if (!container) return;

    // Select the SVG element within the container
    const svg = container.querySelector("svg");
    if (!svg) return;

    // Serialize the SVG to a string
    const svgData = new XMLSerializer().serializeToString(svg);
    // Create a Blob from the SVG string
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const blobUrl = URL.createObjectURL(svgBlob);

    // Create a temporary link to trigger the download
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "qr-code.svg";
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <>
      <Head>
        <title>Simplest QR Code Generator</title>
        <meta name="description" content="QR Codes nur für Jannik" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <input
          type="text"
          placeholder="Enter text or URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginBottom: "20px",
          }}
        />
        {url && (
          <div
            id="qr-code-container"
            style={{
              padding: "16px",
              background: "#fff",
              border: "1px solid #ccc",
            }}
          >
            <QRCode value={url} />
          </div>
        )}
        <button
          onClick={downloadSVG}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          Download SVG
        </button>
        <p>With ❤ from Domi for Jannik</p>
      </div>
    </>
  );
}
