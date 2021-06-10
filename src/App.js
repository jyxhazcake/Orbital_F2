import PagePosting from "./pages/PagePosting";
import PageHome from "./pages/PageHome";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import AppShell from "./components/AppShell";

export default function App() {
  return (
    <>
      <AppShell />
      <div className="App">
        <IfFirebaseAuthed>
          <PagePosting />
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <PageHome />
        </IfFirebaseUnAuthed>
      </div>
    </>
  );
}
