import PagePosting from "./pages/PagePosting";
import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageOrg from "./pages/PageOrg";
import PageStuLogin from "./pages/PageStuLogin";
import RecruiterLogin from "./pages/RecruiterLogin";
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
            <Route path="/recruiterlogin" component={RecruiterLogin} />
            <Route path="/studentlogin" component={PageStuLogin} />{" "}
          </Switch>
        </Router>
      </div>
    </>
  );
}
