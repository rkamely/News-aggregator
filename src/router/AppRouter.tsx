import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home.tsx";
import NotFound from "../pages/notFound/notFound.tsx";
import Post from "../pages/post/Post.tsx";

const AppRouter = () => {

    return (
        <Routes>
            <Route element={<Home/>} path={"/"}/>
            <Route element={<Post/>} path={"/post/:itemId"}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};
export default AppRouter;
