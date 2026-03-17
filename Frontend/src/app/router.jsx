import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import HomePage from "../pages/Home/HomePage";
import Profile from "../pages/Dashboard/Profile/Profile";
import LinkPage from "../pages/Dashboard/Link/LinkPage";
import Features from "../pages/Home/Features";
import CTASection from "../pages/Home/CTASection";
import FeatureExplanation from "../pages/Home/FeatureExplanation";
import HowPeopleUse from "../pages/Home/HowPeopleUse";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignUpPage";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Folderpage from "../pages/Dashboard/Folder/FolderPage";
import NotePage from "../pages/Dashboard/Note/NotePage/NotePage";
import NoteEditorLayout from "../components/layout/NoteEditorLayout/NoteEditorLayout";

const Publicroutes = [
  {
    path: "/",
    element: (
      <>
        <AppLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <HomePage />
            <Features />
            <HowPeopleUse />
            <FeatureExplanation />
            <CTASection />
          </>
        ),
      },
      {
        path: "about",
        element: (
          <>
            <About />
          </>
        ),
      },
      {
        path: "contact",
        element: (
          <>
            <Contact />
          </>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <SignupPage />
      </>
    ),
  },
];

const Protectedroutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "folders",
        element: <Folderpage />,
      },
      {
        path: "folders/:folderId",
        element: <NotePage />,
      },
      {
        path: "folders/:id/note",
        element: <NotePage />,
      },
      {
        path: "links",
        element: <LinkPage />,
      },
    ],
  },
  {
    path: "/dashboard/note/:noteId/edit",
    element: <NoteEditorLayout />,
  },
];

export const router = createBrowserRouter([
  ...Publicroutes,
  ...Protectedroutes,
]);
