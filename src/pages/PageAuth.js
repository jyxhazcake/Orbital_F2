//import Login from '../components/Login'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import { Button } from '@material-ui/core'

function PageAuth() {
    const handleSignIn = (firebase) => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
    };

    return (
        <div>
            <h1>Not logged in!</h1>
            <FirebaseAuthConsumer>
                {({ firebase }) => (
                    <Button 
                        color='primary' 
                        variant='contained'
                        onClick= {() => handleSignIn(firebase)}
                        >
                        Sign in with Google
                    </Button>
                )}
            </FirebaseAuthConsumer>
        </div>
    );
}

export default PageAuth