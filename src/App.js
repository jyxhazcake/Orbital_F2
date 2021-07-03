import PagePosting from "./pages/PagePosting";
import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageOrg from "./pages/PageOrg";
import PageStuLogin from "./pages/PageStuLogin";
import PageStuSignUp from "./pages/PageStuSignup";
import PageRecruiterLogin from "./pages/PageRecruiterLogin";
import PageRecruiterSignup from "./pages/PageRecruiterSignup";
import PageMyPosts from "./pages/PageMyPosts";
import TermsOfUse from "./pages/TermsOfUse";
import ForgotPassword from "./pages/ForgotPassword";
import PageProfile from "./pages/PageProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Authcontext";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <>
      <div className="App">
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/" exact component={PageHome} />
              <Route path="/about" component={PageAbout} />
              <Route path="/opportunities" component={PagePosting} />
              <PrivateRoute path="/myposts" component={PageMyPosts} />
              <Route path="/organisations" component={PageOrg} />
              <Route path="/recruiterlogin" component={PageRecruiterLogin} />
              <Route path="/recruitersignup" component={PageRecruiterSignup} />
              <Route path="/termsofuse" component={TermsOfUse} />
              <Route path="/studentlogin" component={PageStuLogin} />
              <Route path="/studentsignup" component={PageStuSignUp} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/profile" component={PageProfile} />{" "}
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}
