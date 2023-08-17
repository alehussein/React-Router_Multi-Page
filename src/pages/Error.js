import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'something went wrong';

  if(error.status === 500){
    message = error.data.message;
  }

  if(error === 400){
    title= 'not found';
    message= 'could not find resource or page';
  }

  return (
    <>
    <MainNavigation />
    <PageContent title={title}>
    <p>{message}</p>
    </PageContent>
    </>
  )
}

export default ErrorPage