import { Container } from "@mui/material";
import { AppRouter } from "./app/providers";
import Header from "./shared/ui/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AppRouter />
      </Container>
    </>
  );
}

export default App;
