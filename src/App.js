import PagePosting from "./pages/PagePosting";
import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageOrg from "./pages/PageOrg";
import PageStuLogin from "./pages/PageStuLogin";
import PageRecruiterLogin from "./pages/PageRecruiterLogin";
import PageRecruiterSignup from "./pages/PageRecruiterSignup";
import TermsOfUse from "./pages/TermsOfUse"
import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={PageHome} />
            <Route path="/about" component={PageAbout} />
            <Route path="/opportunities" component={PagePosting} />
            <Route path="/organisations" component={PageOrg} />
            <Route path="/recruiterlogin" component={PageRecruiterLogin} />
            <Route path="/recruitersignup" component={PageRecruiterSignup} />
            <Route path="/termsofuse" component={TermsOfUse} />
            <Route path="/studentlogin" component={PageStuLogin} />
            <Route path="/forgotpassword" component={ForgotPassword} />{" "}
          </Switch>
        </Router>
      </div>
    </>
  );
}
