import "./App.css";

import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import type {
  ApiResponse,
  RawShow,
  VideoLesson,
} from "./interfaces/api.interface";
import { CourseList } from "./components/CourseList";
import { AvailableCourseList } from "./components/availableCourseList";
import { MyCourses } from "./components/MyCourses";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { PrivateRoute } from "./components/PrivateRoute";
import { AppLayout } from "./components/AppLayout";
import { Settings } from "./components/Settings";
import { CourseProvider } from "./contexts/CourseContext";
import { useCourses } from "./contexts/CourseContext";

type SelectedCoursePageProps = {
  courses: ApiResponse[];
  isLoading: boolean;
};

function SelectedCoursePage(props: SelectedCoursePageProps) {
  const { courses, isLoading } = props;
  const [searchParams] = useSearchParams();
  const { isEnrolled, enroll, unenroll } = useCourses();
  const courseIdParam = searchParams.get("courseId");
  const selectedCourseId = Number(courseIdParam);

  if (isLoading) {
    return <p>Loading course...</p>;
  }

  if (!courseIdParam || Number.isNaN(selectedCourseId)) {
    return <p>Selecione um curso para ver os detalhes.</p>;
  }

  const selectedCourse = courses.find((course) => course.id === selectedCourseId);

  if (!selectedCourse) {
    return <p>Course not found.</p>;
  }

  const enrolled = isEnrolled(selectedCourse.id);

  return (
    <div>
      <div className="course-enroll-header">
        <button
          type="button"
          className={`enroll-btn ${enrolled ? "enrolled" : ""}`}
          onClick={() =>
            enrolled ? unenroll(selectedCourse.id) : enroll(selectedCourse.id)
          }
        >
          {enrolled ? "Cancelar inscrição" : "Inscrever-se"}
        </button>
      </div>
      <CourseList courses={[selectedCourse]} />
    </div>
  );
}

function App() {
  const API_URL: string = "https://api.tvmaze.com/shows";
  const [courses, setCourses] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toApiResponse = (item: RawShow): ApiResponse | null => {
    if (typeof item.id !== "number" || typeof item.name !== "string") {
      return null;
    }

    return {
      id: item.id,
      name: item.name,
      summary: typeof item.summary === "string" ? item.summary : "",
      image: {
        original:
          typeof item.image?.original === "string" ? item.image.original : "",
      },
    } as ApiResponse;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!Array.isArray(data)) {
          setCourses([]);
          return;
        }

        // coloco os 3 primeiros itens da api para não poluir
        const normalizedCourses = data
          .slice(0, 10)
          .map((item) => toApiResponse(item as RawShow))
          .filter((item): item is ApiResponse => item !== null);

        for (const course of normalizedCourses) {
          const videosResponse = await fetch(
            `${API_URL}/${course.id}/episodes`,
          );
          const videosData = await videosResponse.json();

          if (Array.isArray(videosData)) {
            const videoLessons: VideoLesson[] = videosData.map((video) => ({
              id: video.id,
              number: video.number,
              name: video.name,
              season: video.season,
              summary: video.summary,
              runtime: video.runtime,
              image: {
                original: video.image.original,
              },
            }));

            course.videos = videoLessons;
          }
        }

        setCourses(normalizedCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CourseProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={<AvailableCourseList course={courses} />}
          />
          <Route
            path="/course"
            element={<SelectedCoursePage courses={courses} isLoading={isLoading} />}
          />
          <Route
            path="/courses"
            element={<SelectedCoursePage courses={courses} isLoading={isLoading} />}
          />
          <Route
            path="/my-courses"
            element={<MyCourses courses={courses} isLoading={isLoading} />}
          />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </CourseProvider>
  );
}

export default App;
