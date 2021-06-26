import handhold from "../components/img/handhold.png";
import AppShell from "../components/AppShell";

function PageHome() {
  return (
    <div>
      <AppShell />
      <div className="flex justify-center">
        <img src={handhold} alt="handholing" />{" "}
      </div>
    </div>
  );
}

export default PageHome;
