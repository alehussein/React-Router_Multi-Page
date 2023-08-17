import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import { EditEventPage } from './pages/EditEventPage';
import { RootLayout } from './pages/root';
import { EventDetailPage, loader as eventDetailLoader, action as actionDeleteDetail } from './pages/EventDetailPage';
import EventsPage, { loader } from './pages/EventsPage'
import { NewEventPage } from './pages/NewEventPage'
import ErrorPage from './pages/Error';
import EventRootLayout from './pages/EventsRoot';
import { action as actionEventForm } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, { action as authAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth'

const route = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'events', element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: loader
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: actionDeleteDetail,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: actionEventForm,
                loader: checkAuthLoader,
              },
            ]
          },

          {
            path: 'new',
            element: <NewEventPage />,
            action: actionEventForm,
            loader: checkAuthLoader,
          },
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
])


function App() {
  return <RouterProvider router={route}><div>Home</div></RouterProvider>;
}

export default App;
