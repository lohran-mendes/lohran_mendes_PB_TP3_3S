import "./CourseCard.css";
import imageCustom from "../../assets/images/image-custom.avif";
import videoIcon from "../../assets/icons/video.svg";

export function CourseCard() {
  return (
    <div className="course-card">
      <div className="course-media">
        <span className="course-type">tipo do curso</span>
        <span className="course-duration">
          <img src={videoIcon} alt="Ícone de vídeo" width={16} />
          40 min
        </span>
        <img className="image-custom" src={imageCustom} alt="Imagem aleatória de um curso" />
      </div>
      <h3>1.1 Introdução</h3>
    </div>
  );
}
