import { Fragment } from "react/jsx-runtime";
import type { ApiResponse } from "../../interfaces/api.interface";
import "./CourseList.css";
import { CourseCard } from "../CourseCard";

type CoursesProps = {
  courses: ApiResponse[];
};

export function CourseList(props: CoursesProps) {
  const { courses } = props;

  return (
    <div className="course-list">
      {courses.map((course) => (
        <Fragment key={course.id}>
          <h1>{course.name}</h1>
          <div
            className="course-summary"
            dangerouslySetInnerHTML={{
              __html: course.summary,
            }}
          />
          <div className="course-cards-list">
            {course.videos &&
              course.videos.length > 0 &&
              course.videos
                .slice(0, 8)
                .map((video) => <CourseCard key={video.id} lesson={video} />)}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
