import { Container, Header } from "semantic-ui-react";
import EntryFormPage from "./features/entry-form/EntryFormPage";

function App() {
  return (
    <>
      <Container textAlign="center">
        <Header content="Online entry form" size="large"/>
      </Container>
      <Container>
        <EntryFormPage />
      </Container>
    </>
  );
}

export default App;
