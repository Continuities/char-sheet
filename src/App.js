import './App.css';
import { PartyProvider } from './model';
import PartySection from './PartySection';
import Container from '@mui/material/Container';

const App = () => (
  <PartyProvider>
    <Container>
      <PartySection />
    </Container>
  </PartyProvider>
);

export default App;
