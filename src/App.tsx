import "./App.css";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import type {
  ApiResponse,
  RawShow,
  VideoLesson,
} from "./interfaces/api.interface";
import { CourseList } from "./components/CourseList";
import { AvailableCourseList } from "./components/availableCourseList";

type SelectedCoursePageProps = {
  courses: ApiResponse[];
  isLoading: boolean;
};

function SelectedCoursePage(props: SelectedCoursePageProps) {
  const { courses, isLoading } = props;
  const [searchParams] = useSearchParams();
  const courseIdParam = searchParams.get("courseId");
  const selectedCourseId = Number(courseIdParam);

  if (isLoading) {
    return <p>Loading course...</p>;
  }

  if (!courseIdParam || Number.isNaN(selectedCourseId)) {
    return <p>Você ainda não salvou nenhum curso para a sua lista de favoritos.</p>;
  }

  const selectedCourse = courses.find((course) => course.id === selectedCourseId);

  if (!selectedCourse) {
    return <p>Course not found.</p>;
  }

  return <CourseList courses={[selectedCourse]} />;
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
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AvailableCourseList course={courses} />
                <CourseList courses={courses} />
              </>
            }
          />
          <Route
            path="/course"
            element={<SelectedCoursePage courses={courses} isLoading={isLoading} />}
          />
          <Route
            path="/courses"
            element={<SelectedCoursePage courses={courses} isLoading={isLoading} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
