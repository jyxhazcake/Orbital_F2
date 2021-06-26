import handhold from "../components/img/handhold.png";
import AppShell from "../components/AppShell";

function PageHome() {
  return (
    <div>
      <AppShell />
      <div className="flex justify-center">
      <img src={handhold} className="object-contain" alt="handhold" />
      </div>
    </div>
  );
}

export default PageHome;
