import {
  createBrowserRouter,
} from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";


import {
  lazy,
  Suspense,
  type ReactNode,
} from "react";

const HomePage = lazy(
  () => import("../features/home/HomePage"),
);

const ExercisesPage = lazy(
  () =>
    import("../features/exercises/ExercisesPage"),
);

const ExerciseDetailPage = lazy(
  () =>
    import(
      "../features/exercises/ExerciseDetailPage"
    ),
);

const ProgressPage = lazy(
  () =>
    import("../features/progress/ProgressPage"),
);

const ProfilePage = lazy(
  () =>
    import("../features/profile/ProfilePage"),
);

function RouteLoadingFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div
        role="status"
        aria-live="polite"
        className="text-sm font-medium text-(--text-secondary)"
      >
        Loading BareGains…
      </div>
    </div>
  );
}

function lazyRoute(element: ReactNode) {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      {element}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: lazyRoute(<HomePage />),
      },
      {
        path: "exercises",
        children: [
          {
            index: true,
            element: lazyRoute(<ExercisesPage />),
          },
          {
            path: ":exerciseId",
            element: lazyRoute(
              <ExerciseDetailPage />,
            ),
          },
        ],
      },
      {
        path: "progress",
        element: lazyRoute(<ProgressPage />),
      },
      {
        path: "profile",
        element: lazyRoute(<ProfilePage />),
      },
    ],
  },
]);