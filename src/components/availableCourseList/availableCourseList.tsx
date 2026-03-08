import type { ApiResponse } from "../../interfaces/api.interface";
import { Link } from "react-router-dom";
import { Card } from "../CourseCard";
import "./availableCourseList.css";

type CourseCardProps = {
  course?: ApiResponse[];
};

export function AvailableCourseList(props: CourseCardProps) {
  const { course } = props;

  return (
    <div className="available-course-list">
      <h1>Available Course List</h1>
      <div className="available-course-cards-list">
        {course?.map((c) => (
          <Link
            key={c.id}
            className="available-course-card-link"
            to={`/courses?courseId=${c.id}`}
          >
            <Card
              lesson={c.videos ? c.videos[0] : undefined}
              title={c.name}
              showDuration={false}
            />
          </Link>
        ))}
      </div>

      {/* Aqui você pode adicionar a lógica para exibir a lista de cursos disponíveis */}
    </div>
  );
}