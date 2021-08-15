import PagePosting from "./pages/PagePosting";
import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageStuLogin from "./pages/PageStuLogin";
import PageStuSignUp from "./pages/PageStuSignup";
import PageRecruiterLogin from "./pages/PageRecruiterLogin";
import PageRecruiterSignup from "./pages/PageRecruiterSignup";
import PageMyPosts from "./pages/PageMyPosts";
import TermsOfUse from "./pages/TermsOfUse";
import ForgotPassword from "./pages/ForgotPassword";
import PageStuProfile from "./pages/PageStuProfile";
import PageOrgProfile from "./pages/PageOrgProfile";
import PagePreview from "./pages/PagePreview";
import PageSinglePost from "./pages/PageSinglePost";
import PageApprovals from "./pages/PageApprovals";
import PageUnAuth from "./pages/PageUnAuth";
import PageSubmitted from "./pages/PageSubmitted";
import Page404 from "./pages/Page404";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Authcontext";
import PrivateRoute from "./components/PrivateRoute";
import PageStudent from "./pages/PageStudent";

export default function App() {
  return (
    <>
      <div className="App">
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/" exact component={PageHome} />
              <Route path="/about" component={PageAbout} />
              <Route path="/opportunities" exact component={PagePosting} />
              <PrivateRoute path="/myposts" component={PageMyPosts} />
              <Route path="/recruiterlogin" component={PageRecruiterLogin} />
              <Route path="/recruitersignup" component={PageRecruiterSignup} />
              <Route path="/termsofuse" component={TermsOfUse} />
              <Route path="/studentlogin" component={PageStuLogin} />
              <Route path="/studentsignup" component={PageStuSignUp} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/profile/student/:id" component={PageStuProfile} />
              <Route path="/profile/org/:id" component={PageOrgProfile} />
              <Route path="/preview/:id" component={PagePreview} />
              <Route path="/opportunities/:id" component={PageSinglePost} />
              <Route path="/approvals" component={PageApprovals} />
              <Route path="/unauthorized" component={PageUnAuth} />
              <Route path="/submitted" component={PageSubmitted} />
              <Route path="/studentportal" component={PageStudent} />
              <Route component={Page404} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}
