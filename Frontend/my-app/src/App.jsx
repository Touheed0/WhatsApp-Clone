import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

//Components
import Messenger from './components/messenger'
import AccountProvider from './context/accountProvider';


function App() {

  const clientId = "975343574362-qi89qdq0g5aijmpgeqv8g6b8ta4km0io.apps.googleusercontent.com";

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <AccountProvider>
          <Messenger />
        </AccountProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
