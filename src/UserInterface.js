import PagePosting from "./pages/PagePosting";
import PageHome from "./pages/PageHome";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";

function UserInterface() {
    return (
        <div>
            <IfFirebaseAuthed>
              <PagePosting />
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
              <PageHome />
            </IfFirebaseUnAuthed>
        </div>
    );
}

export default UserInterface;