//import Login from '../components/Login'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import Button from '../components/Button'

function PageAuth() {
    const handleSignIn = (firebase) => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
    };

    return (
        <div>
            <p>Not logged in!</p>
            <FirebaseAuthConsumer>
                {({ firebase }) => (
                    <Button 
                        color='blue' 
                        text='Log in with Google xd' 
                        onClick= {() => handleSignIn(firebase)}
                        > 
                    </Button>
                )}
            </FirebaseAuthConsumer>
        </div>
    );
}

export default PageAuth