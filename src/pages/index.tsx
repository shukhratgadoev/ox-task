import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Auth } from "./auth";
import { Products } from "./products";

export const Routing = () => {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    let token = localStorage.getItem("ox_token");
    setToken(token);
  }, []);

  return (
    <Switch>
      <Route path="/login" exact>
        <Auth token={token} setToken={setToken} />
      </Route>
      <Route path="/" exact>
        <Products token={token} />
      </Route>
    </Switch>
  );
};
