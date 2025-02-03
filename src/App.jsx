import { useState } from 'react';
import { Routes, Route} from 'react-router-dom';

import NavBar from './Component/NavBar';

import Home from './Pages/Home';
import Author from './Pages/Author';
import Post from './Pages/Post';
import AuthorDetail from './Pages/AuthorDetail';
import PostDetail from './Pages/PostDetail';
import Footer from './Component/Footer';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Author" element={<Author />} />
        <Route path="/Author/:id" element={<AuthorDetail />}/> 
        <Route path="/Post" element={<Post />} />
        <Route path="/Post/:id" element={<PostDetail />}/>

        
        
      </Routes>
      <Footer/>

    </>
  );
}

export default App;
