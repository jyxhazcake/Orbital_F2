import handhold from "../components/img/handhold.png";
import AppShell from "../components/AppShell";

function PageHome() {
  return (
    <div>
      <AppShell />
      <img src={handhold} class="object-contain" alt="handhold" />
    </div>
  );
}

export default PageHome;
