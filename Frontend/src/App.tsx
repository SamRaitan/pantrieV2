import AppRouter from "./router"
import { AppShell, AppShellFooter } from "@mantine/core";
import { IsCookie } from "./components/shared/isLoggedIn";

function App() {
  IsCookie()

  return (
    <AppShell>
      <AppShell.Main mb={25}>
        <AppRouter />
      </AppShell.Main>
    </AppShell>
  )
}

export default App



