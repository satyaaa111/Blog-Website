import './App.css';
import Navbar from './components/navbar'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Home from './components/pages/home'
import About from './components/pages/about'
import Personal from './components/pages/personal'
import YourBlog from './components/pages/yourBlog'
import Create from './components/pages/createBlog'
import View from './components/pages/viewBlog'
import Edit from './components/pages/edit'
import {BlogProvider} from './context/blogcontext'
function App() {
  return (
    <BlogProvider>

    <div>
    <Router>
      <Navbar/>
        <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/about' element={< About />}></Route>
                <Route exact path='/personal' element={< Personal />}></Route>
                <Route exact path='/writeBlog' element={< Create />}></Route>
                <Route exact path='/yourBlog' element={< YourBlog />}></Route>
                <Route exact path='/viewBlog/:_id' element={< View />}></Route>
                <Route exact path='/editBlog/:title/:description/:_id' element={< Edit />}></Route>
        </Routes>
     </Router>
    </div>
    </BlogProvider>
  );
}

export default App;
