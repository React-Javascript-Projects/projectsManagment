import "./App.css";
import React, { Suspense, useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Layout/Header";
import SignForm from "./pages/SignForm";
import Loader from "./componants/UI/Loader";
import { UserContext } from "./context/UserContext";
import ProtectRouter from "./componants/UI/ProtectRouter";
import { getUser } from "./context/UserAction";

const AllProjects = React.lazy(() => import("./pages/AllProjects"));
const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));
const ProjectForm = React.lazy(() =>
  import("./componants/Projects/ProjectForm")
);
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/login" exact component={SignForm} />
            <ProtectRouter path={"/"} exact component={AllProjects} />
            <ProtectRouter path={"/Add"} exact component={ProjectForm} />
            <ProtectRouter
              path={"/:projectID"}
              exact
              component={ProjectDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
