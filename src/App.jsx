import React, { Suspense, lazy } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import Form from "./components/search.form.component";

import Loader from "./components/loader.component";

// import Empty from "./pages/empty.page";
// import Soorah from "./pages/soorah.page";
// import Ayah from "./pages/ayah.page";
// import Search from "./pages/search.page";

import soorahList from "./assets/soorahList.js";
const DEFAULT_TRANSLATOR = process.env.REACT_APP_DEFAULT_TRANSLATOR;

const Empty = lazy(() => import("./pages/empty.page"));
const Soorah = lazy(() => import("./pages/soorah.page"));
const Ayah = lazy(() => import("./pages/ayah.page"));
const Search = lazy(() => import("./pages/search.page"));

const App = () => {
  let paramQuery = new URLSearchParams(useLocation().search);

  // let t = paramQuery.get("t") || DEFAULT_TRANSLATOR;
  // if (![1, 2, 3, 4].includes(t)) t = DEFAULT_TRANSLATOR;

  let history = useHistory();

  const onSearch = (form) => {
    if (form.s > 0 && form.s < 115) {
      form.view = "soorah";
      if (form.a > 0 && form.a < 287) {
        form.view = "ayah";
      }
    } else if (form.q.length > 3) {
      form.view = "search";
    } else form.view = "empty";

    if ([1, 2, 3, 4].indexOf(t) !== -1) t = DEFAULT_TRANSLATOR;

    switch (form.view) {
      case "search":
        history.push(`/search/${form.q}?t=${form.t}`);
        break;
      case "soorah":
        history.push(`/${form.s}?t=${form.t}`);
        break;
      case "ayah":
        history.push(`/${form.s}/${form.a}?t=${form.t}`);
        break;
      case "empty":
      default:
        history.push(`/`);
        break;
    }
  };

  const translator = () => {
    let t = paramQuery.get("t") || DEFAULT_TRANSLATOR;
    if ([1, 2, 3, 4].indexOf(t) !== -1) t = DEFAULT_TRANSLATOR;
    return t;
  };

  let t = translator();

  return (
    <Suspense
      fallback={
        <>
          <Form />
          <Loader />
        </>
      }
    >
      <Switch>
        <Route
          exact={true}
          path="/"
          render={() => (
            <>
              <Form onSubmit={onSearch} />
              <br />
              <Empty />
            </>
          )}
        />
        <Route
          path="/search/:query"
          render={(q) => {
            const formData = {
              q: q.match.params.query,
              t: translator(),
            };
            return (
              <>
                <Form onSubmit={onSearch} formData={formData} />
                <br />
                <Search query={formData.q} t={formData.t} />
              </>
            );
          }}
        />
        <Route
          exact={true}
          strict={false}
          path="/:soorah([1-9]|[1-8][0-9]|9[0-9]|10[0-9]|11[0-4])"
          render={(q) => {
            const formData = {
              s: Number(q.match.params.soorah),
              t: translator(),
            };
            return (
              <>
                <Form onSubmit={onSearch} formData={formData} />
                <br />
                <Soorah
                  soorahTitle={soorahList[formData.s]}
                  soorah={formData.s}
                  t={formData.t}
                />
              </>
            );
          }}
          key={Math.random()}
        ></Route>
        <Route
          exact={false}
          strict={false}
          path="/:soorah([1-9]|[1-8][0-9]|9[0-9]|10[0-9]|11[0-4])/:ayah([1-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-7][0-9]|28[0-6])"
          render={(q) => {
            const formData = {
              s: Number(q.match.params.soorah),
              a: Number(q.match.params.ayah),
              t: translator(),
            };
            return (
              <>
                <Form onSubmit={onSearch} formData={formData} />
                <br />
                <Ayah
                  soorahTitle={soorahList[formData.s]}
                  soorah={formData.s}
                  ayah={formData.a}
                  t={formData.t}
                />
              </>
            );
          }}
          key={Math.random()}
        />
        <Route
          path="*"
          render={() => (
            <>
              <Form onSubmit={onSearch} />
              <br />
              <Empty alert="danger" />
            </>
          )}
          status={404}
        />
      </Switch>
    </Suspense>
  );
};

export default App;
