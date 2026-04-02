import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface CourseContextType {
  enrolledCourseIds: number[];
  enroll: (courseId: number) => void;
  unenroll: (courseId: number) => void;
  isEnrolled: (courseId: number) => boolean;
}

const CourseContext = createContext<CourseContextType | null>(null);

function getStorageKey(userId: string): string {
  return `learnflix_mycourses_${userId}`;
}

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>(() => {
    if (!user) return [];
    const stored = localStorage.getItem(getStorageKey(user.id));
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(getStorageKey(user.id));
      setEnrolledCourseIds(stored ? JSON.parse(stored) : []);
    } else {
      setEnrolledCourseIds([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        getStorageKey(user.id),
        JSON.stringify(enrolledCourseIds),
      );
    }
  }, [enrolledCourseIds, user]);

  function enroll(courseId: number) {
    setEnrolledCourseIds((prev) =>
      prev.includes(courseId) ? prev : [...prev, courseId],
    );
  }

  function unenroll(courseId: number) {
    setEnrolledCourseIds((prev) => prev.filter((id) => id !== courseId));
  }

  function isEnrolled(courseId: number): boolean {
    return enrolledCourseIds.includes(courseId);
  }

  return (
    <CourseContext.Provider
      value={{ enrolledCourseIds, enroll, unenroll, isEnrolled }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses(): CourseContextType {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses deve ser usado dentro de um CourseProvider.");
  }
  return context;
}
