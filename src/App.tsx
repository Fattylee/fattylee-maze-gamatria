import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Header } from "./components/Header";
import { AuthProvider } from "./context/auth";
import { AuthRoute } from "./context/AuthRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { FormProvider } from "./context/postForm";
import { UIContextProvider } from "./context/uiContext";
import { ActiveLinkProvider } from "./context/activeLink";

const App = () => {
  return (
    <UIContextProvider>
      <ActiveLinkProvider>
        <AuthProvider>
          <FormProvider>
            <Router>
              <Container>
                <Header />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Router>
          </FormProvider>
        </AuthProvider>
      </ActiveLinkProvider>
    </UIContextProvider>
  );
};

export default App;
