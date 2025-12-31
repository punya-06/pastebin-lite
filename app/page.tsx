"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText]=useState("");
  const [pastes, setPastes] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/pastes")
    .then(res => res.json())
    .then(data => setPastes(data));
      },[]);

      function savePaste() {
        if (!text.trim()) return;

        fetch("/api/pastes",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: text }),
        })
        .then(res => res.json())
        .then(newPaste=> {
          setPastes([newPaste, ...pastes]);
          setText("");
        });
      }
  return ( 
    <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "Center",
      alignItems:"Center",
    }}
    >
    <main style={{ width: "420%",maxWidth: "600px",padding: "30px",
      background: "rgba(255,255,255,0.95)",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}>
     <h2 style={{ textAlign: "center",marginBottom: "20px"}}>
      All Pastes
      </h2>

     <textarea 
       value={text}
       onChange={(e) => setText(e.target.value)}
       rows={6}
       placeholder="Type your paste here..."
       style={{
        width: "100%",
        padding: "14px",
        fontSize: "15px",
        borderRadius: "8px",
        border: "3px soild #00000",
        outline: "none",
        backgroundColor: "#c5bebeff",
        boxSizing: "border-box",
        marginBottom: "18px",
       }}
       />
      <br/>
      <button onClick={savePaste}
      style={{
        width: "100%",
        padding: "12px",
        background: "linear-gradient(135deg, #ddd5ceff,#1c6bff)",
        color: "black",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
      >
        Save Paste
      </button>
      <h3 style={{ marginTop: "30px"}}>All Pastes</h3>
      <ul style={{ listStyle: "none",padding: 0}}>
      {pastes.map(paste => (
        <li key={paste.id}
        style={{
          padding: "12px",
          marginTop: "10px",
          background: "#fff",
          borderRadius: "10px",
          border: "1px soild #eee",
          fontSize: "14px:",
        }}
        >{paste.content}</li>
      ))}
    </ul>
  </main>
  </div>
  );
}