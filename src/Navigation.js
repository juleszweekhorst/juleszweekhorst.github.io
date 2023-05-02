// Module imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Paths to components
import NavigationBar from "./components/NavigationBar";
// Paths to pages
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import SearchPage from "./pages/SearchPage";
import Page404 from "./pages/Page404";
import CategoryPage from "./pages/CategoryPage";
import CategoryBar from "./components/CategoryBar";

function Navigation() {
    return (
        <Router>
            <NavigationBar/>
            <CategoryBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/:category" element={<Home/>}/>
                <Route path="/category/:category" element={<CategoryPage/>}/>
                <Route path="/search/:search" element={<SearchPage/>}/>
                <Route path="/article/:id" element={<ArticlePage/>}/>
                <Route path="/404" element={<Page404/>}/>
            </Routes>
        </Router>
    )
}
export default Navigation;


