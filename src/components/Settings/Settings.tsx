import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Settings.css";

export function Settings() {
  const { user, updateProfilePhoto } = useAuth();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  async function openCamera() {
    setCameraError("");

    const permission = await navigator.permissions.query({
      name: "camera" as PermissionName,
    }).catch(() => null);

    if (permission && permission.state === "denied") {
      setCameraError(
        "Acesso a camera foi negado. Verifique as permissoes do navegador."
      );
      return;
    }

    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setIsCameraOpen(false);
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setCameraError(
          "Voce precisa permitir o acesso a camera para tirar uma foto."
        );
      } else {
        setCameraError("Nao foi possivel acessar a camera do dispositivo.");
      }
    }
  }

  function capturePhoto() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const photoData = canvas.toDataURL("image/png");
    updateProfilePhoto(photoData);
    closeCamera();
  }

  function closeCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  }

  if (!user) return null;

  return (
    <div className="settings-page">
      <h1>Meu Perfil</h1>
      <div className="profile-card">
        <div className="profile-avatar">
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt="Foto de perfil" />
          ) : (
            <span className="profile-avatar-placeholder">&#128100;</span>
          )}
        </div>
        <div className="profile-info">
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
        </div>
        <button
          type="button"
          className="profile-photo-btn"
          onClick={openCamera}
        >
          Tirar foto
        </button>
        {cameraError && <p className="camera-error">{cameraError}</p>}
      </div>

      {isCameraOpen && (
        <div className="camera-overlay">
          <div className="camera-modal">
            <video ref={videoRef} autoPlay playsInline muted />
            <div className="camera-actions">
              <button
                type="button"
                className="camera-capture-btn"
                onClick={capturePhoto}
              >
                Capturar
              </button>
              <button
                type="button"
                className="camera-cancel-btn"
                onClick={closeCamera}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
