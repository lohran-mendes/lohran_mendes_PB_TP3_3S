import type { ApiResponse } from "../../interfaces/api.interface";
import { Link } from "react-router-dom";
import { Card } from "../CourseCard";
import { useSearch } from "../../contexts/SearchContext";
import "./availableCourseList.css";

type CourseCardProps = {
  course?: ApiResponse[];
};

export function AvailableCourseList(props: CourseCardProps) {
  const { course } = props;
  const { searchQuery } = useSearch();

  const filteredCourses = searchQuery.trim()
    ? course?.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : course;

  return (
    <div className="available-course-list">
      <h1>Available Course List</h1>
      {searchQuery.trim() && (
        <p className="search-results-info">
          {filteredCourses?.length === 0
            ? `Nenhum curso encontrado para "${searchQuery}"`
            : `${filteredCourses?.length} curso(s) encontrado(s) para "${searchQuery}"`}
        </p>
      )}
      <div className="available-course-cards-list">
        {filteredCourses?.map((c) => (
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
    </div>
  );
}