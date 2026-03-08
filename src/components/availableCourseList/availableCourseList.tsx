import type { ApiResponse } from "../../interfaces/api.interface";
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
          <Card
            key={c.id}
            lesson={c.videos ? c.videos[0] : undefined}
            title={c.name}
            showDuration={false}
          />
        ))}
      </div>

      {/* Aqui você pode adicionar a lógica para exibir a lista de cursos disponíveis */}
    </div>
  );
}