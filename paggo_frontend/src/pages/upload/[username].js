import { useState } from "react";
import { useRouter } from "next/router";

export default function UploadFile() {
    const router = useRouter();
    const { username } = router.query;
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [ocrText, setOcrText] = useState("");
    const [geminiResponse, setGeminiResponse] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const formData = new FormData();
        formData.append("file", file);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${apiBaseUrl}file-upload/${username}`, true);

        xhr.onload = () => {
            if (xhr.status === 201) {
                const response = JSON.parse(xhr.responseText);
                setOcrText(response.ocr); // Store OCR text
                setMessage("File uploaded successfully!");

                // Send OCR text to Gemini
                sendToGemini(response.ocr);
            } else {
                setMessage("File upload failed.");
            }
        };

        xhr.onerror = () => {
            setMessage("Error while uploading.");
        };

        xhr.send(formData);
    };

    const sendToGemini = (ocr) => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${apiBaseUrl}gemini/generate`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                setGeminiResponse(xhr.responseText);
            } else {
                setGeminiResponse("Failed to generate AI response.");
            }
        };

        xhr.onerror = () => {
            setGeminiResponse("Error while sending to Gemini.");
        };

        xhr.send(JSON.stringify({ ocr }));
    };

    return (
        <div>
            <h2>Upload a PDF Invoice</h2>
            <p>Uploading as: <strong>{username || "Loading..."}</strong></p>
            <form onSubmit={handleUpload}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
            {ocrText && (
                <div>
                    <h3>Extracted OCR Text</h3>
                    <p>{ocrText}</p>
                </div>
            )}
            {geminiResponse && (
                <div>
                    <h3>Gemini AI Response</h3>
                    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                        {geminiResponse}
                    </pre>
                </div>
            )}
        </div>
    );
}
