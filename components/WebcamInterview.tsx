"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Mic, Video, PhoneOff } from "lucide-react";

export default function WebcamInterview() {

  const webcamRef = useRef<Webcam>(null);

  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState(
    "Tell me about yourself."
  );

  const startInterview = () => {
    setStarted(true);
  };

  const endInterview = () => {
    setStarted(false);
  };

  return (
    <div className="bg-white border rounded-2xl p-4">

      <h2 className="text-xl font-bold mb-3">
        AI Interviewer
      </h2>


      {/* Camera */}
<div className="rounded-xl overflow-hidden bg-black w-full h-[250px] flex items-center justify-center">

  {started ? (
    <Webcam
      ref={webcamRef}
      audio={true}
      className="w-full h-full object-contain"
      videoConstraints={{
        width: 640,
        height: 480,
        facingMode: "user",
      }}
    />
  ) : (
    <div className="h-full flex items-center justify-center text-white">
      <Video size={40} />
    </div>
  )}

</div>

      {/* AI Question */}
      <div className="mt-3 bg-gray-100 p-3 rounded-xl">

        <p className="font-semibold text-sm">
          AI:
        </p>

        <p className="mt-1 text-sm">
          {question}
        </p>

      </div>


      {/* Buttons */}
      <div className="flex gap-3 mt-3">

        {!started ? (

          <button
            onClick={startInterview}
            className="bg-black text-white px-5 py-2 rounded-lg text-sm"
          >
            Start Interview
          </button>

        ) : (

          <>
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
            >
              <Mic size={16}/>
              Answer
            </button>


            <button
              onClick={endInterview}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg text-sm"
            >
              <PhoneOff size={16}/>
              End
            </button>
          </>

        )}

      </div>

    </div>
  );
}