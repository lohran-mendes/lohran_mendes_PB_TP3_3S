import "./App.css";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { CourseCard } from "./components/CourseCard";
import { Fragment, useEffect, useState } from "react";
import type {
  ApiResponse,
  RawShow,
  VideoLesson,
} from "./interfaces/api.interface";

function App() {
  const API_URL: string = "https://api.tvmaze.com/shows";
  const [courses, setCourses] = useState<ApiResponse[]>([]);
  const [videosOfCourse, setVideosOfCourse] = useState<string[]>([]);

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
          .slice(0, 3)
          .map((item) => toApiResponse(item as RawShow))
          .filter((item): item is ApiResponse => item !== null);

        for (const course of normalizedCourses) {
          const videosResponse = await fetch(
            `${API_URL}/${course.id}/episodes`,
          );
          const videosData = await videosResponse.json();

          if (Array.isArray(videosData)) {
            const videoLessons: VideoLesson[] = videosData
              .filter(
                (video) =>
                  typeof video.id === "number" &&
                  typeof video.number === "number" &&
                  typeof video.name === "string" &&
                  typeof video.season === "number" &&
                  typeof video.summary === "string" &&
                  typeof video.runtime === "number" &&
                  typeof video.image?.original === "string",
              )
              .map((video) => ({
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
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("courses atualizado:", courses);
  }, [courses]);

  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main>
        {courses.map((course) => (
          <Fragment key={course.id}>
            <h1>{course.name}</h1>
            <div
              className="course-summary"
              dangerouslySetInnerHTML={{
                __html: course.summary,
              }}
            />
            <div className="course-cards-list" >
              {course.videos &&
                course.videos.length > 0 &&
                course.videos.map((video) => (
                  <CourseCard key={video.id} lesson={video} />
                ))}
            </div>
          </Fragment>
        ))}
      </main>
    </div>
  );
}

export default App;
