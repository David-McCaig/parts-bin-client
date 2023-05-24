import HomePage from './Pages/HomePage/HomePage.jsx';
import UploadPage from './Pages/UploadPage/UploadPage.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import BikesPage from './Pages/BikesPage/BikesPage';
import BikeComponentsPage from './Pages/BikeComponentsPage/BikeComponentsPage';
import ProductDetailsPage from './Pages/productDetailsPage/ProductDetailsPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Signup from './Pages/SignupPage/SignupPage';
import Login from './Pages/Login/LoginPage';
import Chat from './Pages/ChatPage/ChatPage.jsx';
import ChatDashboardPage from './Pages/ChatDashboardPage/ChatDashboardPage.jsx';
import './App.scss';
import { Routes, Route, BrowserRouter  } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { ProductProvider } from "./Contexts/ProductContext.jsx";
import { ChatProvider } from './Contexts/ChatContext';
import Footer from './Components/Footer/Footer';

function App() {

  return (
    <>
      {/* Provider for authorization. Wrap components in a provider pattern to make passing state and setting state around easier */}
      <ChatProvider>
      <ProductProvider>
        <AuthProvider>
        <BrowserRouter>
          <NavBar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/upload' element={<UploadPage />} />
              <Route path='/bikes' element={<BikesPage />} />
              <Route path='/components' element={<BikeComponentsPage />} />
              <Route path='/product/:id' element={<ProductDetailsPage />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/chatdashboard' element={<ChatDashboardPage/>} />
            </Routes>
          <Footer />
          </BrowserRouter>
        </AuthProvider>
      </ProductProvider>
      </ChatProvider>
    </>
  );
}

export default App;
