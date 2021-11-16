import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainPage } from "../Pages/MainPage";
import { ListPage } from "../Pages/ListPage";
import { ListPageById } from "../Pages/ListPageById";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/list">
            <ListPage />
          </Route>
          <Route exact path="/list-by-id">
            <ListPageById />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
