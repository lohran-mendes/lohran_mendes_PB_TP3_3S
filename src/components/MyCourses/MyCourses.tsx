import type { ApiResponse } from "../../interfaces/api.interface";
import { Link } from "react-router-dom";
import { Card } from "../CourseCard";
import { useCourses } from "../../contexts/CourseContext";
import "./MyCourses.css";

type MyCoursesProps = {
  courses: ApiResponse[];
  isLoading: boolean;
};

export function MyCourses({ courses, isLoading }: MyCoursesProps) {
  const { enrolledCourseIds, unenroll } = useCourses();

  if (isLoading) {
    return <p>Carregando cursos...</p>;
  }

  const myCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  if (myCourses.length === 0) {
    return (
      <div className="my-courses">
        <h1>Meus Cursos</h1>
        <p>Você ainda não se inscreveu em nenhum curso.</p>
        <Link to="/" className="browse-courses-link">
          Ver cursos disponíveis
        </Link>
      </div>
    );
  }

  return (
    <div className="my-courses">
      <h1>Meus Cursos</h1>
      <div className="my-courses-list">
        {myCourses.map((course) => (
          <div key={course.id} className="my-course-item">
            <Link
              className="my-course-card-link"
              to={`/courses?courseId=${course.id}`}
            >
              <Card
                lesson={course.videos ? course.videos[0] : undefined}
                title={course.name}
                showDuration={false}
              />
            </Link>
            <button
              type="button"
              className="unenroll-btn"
              onClick={() => unenroll(course.id)}
            >
              Cancelar inscrição
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
