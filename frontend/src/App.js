import './App.css';
import { CreatePost } from './components/CreatePost';
import { EditPost } from './components/EditPost';
import { Login } from './components/Login';
import { Post } from './components/Post';
import { PostDetails } from './components/PostDetails';
import { Register } from './components/Register';
import { UserContextProvider } from './components/UserContext';
import { Footer } from './components/layouts/Footer';
import { Header } from './components/layouts/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router> 
      <div className="App">
        <UserContextProvider>
        <Header />
        <ToastContainer position='top-center' theme='colored' />
        <Routes>
          <Route path='/' element={ <Post />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/create' element={<CreatePost/>}/>
          <Route path="/post/:id" element={<PostDetails/>}/>
          <Route path='/edit/:id' element={<EditPost/>}/>
        </Routes>
        <Footer />
        </UserContextProvider>
      </div>

    </Router>


  );
}

export default App;
