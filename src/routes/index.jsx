import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Error from '../pages/Error';
import Project from '../pages/Project';
import Contact from '../pages/Contact';

const router = createBrowserRouter([
    {
        path: '*',
        element: <Error />,
    },
    {
        path: '/',
        errorElement: <Error />,
        element: <Home />,
    },
    {
        path: '/about',
        errorElement: <Error />,
        element: <About />,
    },
    {
        path: '/project',
        errorElement: <Error />,
        element: <Project />,
    },
    {
        path: '/contact',
        errorElement: <Error />,
        element: <Contact />,
    },
]);

export default router;
