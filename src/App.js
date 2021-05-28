import PagePosting from './pages/PagePosting'
import PageAuth from './pages/PageAuth'
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

export default function App() {
  return (
    <div className="App">
    <IfFirebaseAuthed>
      <PagePosting />
    </IfFirebaseAuthed>
    <IfFirebaseUnAuthed>
      <PageAuth />
    </IfFirebaseUnAuthed>
    </div>
  );
}
