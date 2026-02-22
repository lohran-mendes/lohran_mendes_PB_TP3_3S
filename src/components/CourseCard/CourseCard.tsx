import "./CourseCard.css";
import imageCustom from "../../assets/images/image-custom.avif";
import videoIcon from "../../assets/icons/video.svg";
import type { VideoLesson } from "../../interfaces/api.interface";

type CourseCardProps = {
  lesson?: VideoLesson;
};

export function CourseCard(props: CourseCardProps) {
  const { lesson } = props;

  return (
    <div className="course-card">
      <div className="course-media">
        {/* <span className="course-type">{lesson?.name}</span> */}
        <span className="course-duration">
          <img src={videoIcon} alt="Ícone de vídeo" width={16} />
          {lesson?.runtime} min
        </span>
        <img className="image-custom" src={lesson?.image.original || imageCustom} alt="Imagem aleatória de um curso" />
      </div>
      <h3>{lesson?.number} - {lesson?.name}</h3>
    </div>
  );
}
