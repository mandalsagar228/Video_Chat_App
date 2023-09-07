import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";

const Room = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email${email} joined the room`);
    setRemoteSocketId(id);
  }, []);

  //   for calling user
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);

    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  const mirrorCamera = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    context.clearRect(0, 0, width, height);

    // Flip the video horizontally (mirror effect)
    context.scale(-1, 1);
    context.drawImage(video, -width, 0, width, height);

    // Display the mirrored video on the <video> element
    video.srcObject = canvas.captureStream();
  };

  return (
    <div
      style={{
        backgroundColor: "skyblue",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <div>Room</div>
      <h1>{remoteSocketId ? "Connected" : " No one in room"}</h1>
      {remoteSocketId && (
        <button onClick={handleCallUser} style={{ padding: "6px 36px" }}>
          Call
        </button>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {myStream && (
          <ReactPlayer playing height="800px" width="800px" url={myStream} />
        )}
      </div>

      <div>
        <video ref={videoRef} autoPlay />
        <button onClick={mirrorCamera}>Mirror Camera</button>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default Room;
