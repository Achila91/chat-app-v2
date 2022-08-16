import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherMeeting from "./Pages/teacher_meeting";
import TeacherStudentDetails from "./Pages/teacher_student_details";
import TeacherTimeDetails from "./Pages/teacher_time_details";
import Login from "./Pages/login";
import StudentPage from "./Pages/student_page";
import MeetingPage from "./Pages/meeting_page";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./Store/reducer";

export const store = createStore(reducer);
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherStudentDetails />} />
          <Route path="/time" element={<TeacherTimeDetails />} />
          <Route path="/meeting" element={<TeacherMeeting />} />

          <Route
            path="/meeting-page/:id"
            element={
              <Provider store={store}>
                <MeetingPage />
              </Provider>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
