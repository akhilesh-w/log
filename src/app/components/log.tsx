"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { stringify } from 'querystring';

const Log: React.FC = () => {
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [entries, setEntries] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const savedText = localStorage.getItem('log') || 'Hello';
    setText(savedText);
    setEntries(savedText.split('\n').length);
  }, []);

  useEffect(() => {
    localStorage.setItem('log', text);
    setEntries(text.split('\n').length);
  }, [text]);

  const exportData = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = 'log.txt';
    document.body.appendChild(element);
    element.click();
  };

  const calculateTimeSpent = () => {
    const now = Date.now();
    const timeSpent = (now - startTime) / 1000 / 60;
    return timeSpent.toFixed(2);
  };

  return (
    <div>
      <textarea
        className="w-full h-screen bg-gray-800 text-white p-8"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="m-8">
        <p>entries: {entries}</p>
        <p>time spent: {calculateTimeSpent()} minutes</p>
        <button
          className="mt-4 border text-white p-2 rounded"
          onClick={exportData}
        >
          Export Data
        </button>
      </div>
    </div>
  );
};

export default Log;
