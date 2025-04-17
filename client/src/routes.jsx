import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './authentication/ProtectedRoute';
import { Spinner } from '@nextui-org/react';

// Lazy loaded components
const Home = React.lazy(() => import('./client/Home'));
const Trainers = React.lazy(() => import('./client/Trainers'));
const Service = React.lazy(() => import('./client/Service'));
const Shop = React.lazy(() => import('./client/Shop'));
const About = React.lazy(() => import('./client/About'));
const Login = React.lazy(() => import('./authentication/Login'));
const Signup = React.lazy(() => import('./authentication/Signup'));
const HomePage = React.lazy(() => import('./client/HomePage'));
const Layout = React.lazy(() => import('./user/navigation/Layout'));
const Dashboard = React.lazy(() => import('./user/pages/Dashboard'))
const PageNotFound = React.lazy(() => import('./components/PageNotFound'))
const Test = React.lazy(() => import('./components/Test'))
const Profile = React.lazy(() => import('./components/Profile'))
// user 
const UserPlans = React.lazy(() => import('./user/pages/Plans'));
const UserCategory = React.lazy(() => import('./user/pages/Category'));
const UserWorkout = React.lazy(() => import('./user/pages/Workouts'));
// admin 
const AdminDashboard = React.lazy(() => import('./admin/pages/Dashboard'));
const AdminPlans = React.lazy(() => import('./admin/pages/Plans'));
const AdminLayout = React.lazy(() => import('./admin/navigation/Layout'));
const AdminUsers = React.lazy(() => import('./admin/pages/Users'))
const AdminTrainers = React.lazy(() => import('./admin/pages/Trainers'))
const AdminWorkout = React.lazy(() => import('./admin/pages/Workout'))
//trainer
const TrainerLayout = React.lazy(() => import('./trainer/navigation/Layout'));
const TrainerDashboard = React.lazy(() => import('./trainer/pages/Dashboard'));
const TrainerPlans = React.lazy(() => import('./trainer/pages/Plans'));
const TrainerWorkout = React.lazy(() => import('./trainer/pages/Workout'));
const TrainerSignUp = React.lazy(() => import('./authentication/TrainerSignUp'))
const Cart = React.lazy(() => import('./shop/components/Cart'));
function AppRoutes() {
    const routesList = [
        {
            path: "*", element: <PageNotFound />
        },
        {
            path: "/", element: <HomePage />, children: [
                { path: "", element: <Navigate to="home" /> },
                { path: "home", element: <Home /> },
                { path: "about", element: <About /> },
                { path: "trainers", element: <Trainers /> },
                { path: "service", element: <Service /> },
                { path: "shop", element: <Shop /> },
                { path: "cart", element: <Cart /> },
            ]
        },


        // user routes 
        {
            path: "user", element: <ProtectedRoute component={Layout} role='user' />, children: [
                { path: "", element: <Navigate to="dashboard" /> },
                { path: "dashboard", element: <Dashboard /> },
                { path: "plans", element: <UserPlans /> },
                { path: 'profile', element: <Profile /> },
                { path: 'category', element: <UserCategory /> },
                { path: 'workout', element: <UserWorkout /> }

            ]
        },

        // admin routes
        {
            path: "admin", element: <ProtectedRoute component={AdminLayout} role='admin' />, children: [
                { path: "", element: <Navigate to="dashboard" /> },
                { path: "dashboard", element: <AdminDashboard /> },
                { path: "Plans", element: <AdminPlans /> },
                { path: "user", element: <AdminUsers /> },
                { path: "trainer", element: <AdminTrainers /> },
                // { path: 'profile', element: <Profile /> },
                { path: 'workout', element: <AdminWorkout /> }

            ]
        },

        // trainer routes
        {
            path: "trainer", element: <TrainerLayout />, children: [
                { path: "", element: <Navigate to="dashboard" /> },
                { path: "dashboard", element: <TrainerDashboard /> },
                { path: "Plans", element: <TrainerPlans /> },
                { path: 'workout', element: <TrainerWorkout /> }

            ]
        },


        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "trainersignup", element: <TrainerSignUp /> },
        { path: 'test', element: <Test /> },
    ];

    return (
        <Suspense fallback={<Spinner label="Loading..." color="success" className="bg-light dark:bg-background w-screen h-screen" />}>
            <BrowserRouter>
                <Routes>
                    {routesList.map(({ path, element, children }) => (
                        <Route key={path} path={path} element={element}>
                            {children?.map(({ path, element }) => (
                                <Route key={path} path={path} element={element} />
                            ))}
                        </Route>
                    ))}
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default AppRoutes;
