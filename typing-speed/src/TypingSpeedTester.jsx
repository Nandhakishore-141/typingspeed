import React, { useState, useRef, useEffect, useMemo } from 'react';
import './TypingSpeedTester.css';

export default function TypingSpeedTester() {
  const textToType = "Practice makes a man perfect!";
  const [time, setTime] = useState(0);
  const [textInput, setTextInput] = useState("");
  const timerRef = useRef(null);
  const textInputRef = useRef(null);

  useEffect(() => textInputRef.current.focus(), []);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => setTime(t => t + 10), 10);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const reset = () => {
    stopTimer();
    setTime(0);
    setTextInput("");
    textInputRef.current.focus();
  };

  useEffect(() => { if (textInput === textToType) stopTimer(); }, [textInput]);

  const accuracy = useMemo(() => {
    let correct = 0;
    for (let i = 0; i < textInput.length; i++) {
      if (i < textToType.length && textInput[i] === textToType[i]) correct++;
    }
    return ((correct / textToType.length) * 100).toFixed(1);
  }, [textInput]);

  const wpm = useMemo(() => {
    const words = textInput.trim().split(/\s+/).length;
    return (time > 0) ? ((words / (time / 60000))).toFixed(1) : 0;
  }, [textInput, time]);

  return (
    <div className="typing-tester">
      <h1>Typing Speed Checker ⌨️</h1>
      <p><b>Text to type:</b> <mark>{textToType}</mark></p>
      <textarea
        ref={textInputRef}
        value={textInput}
        onChange={e => { setTextInput(e.target.value); startTimer(); }}
        cols="50"
        rows="5"
      />
      <h3>Time elapsed: {(time / 1000).toFixed(2)}s</h3>
      <h3>Accuracy: {accuracy}%</h3>
      <h3>WPM: {wpm}</h3>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
