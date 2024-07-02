import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};
const Auth0PrividerWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  if (!domain || !clientId || !redirectURI || !audience) {
    throw new Error("unable to initialise auth");
  }
  const onRedirectCallback = () => {
    navigate("/auth-callback");
  };
  return (
    <div>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: redirectURI, audience }}
        onRedirectCallback={onRedirectCallback}
      >
        {children}
      </Auth0Provider>
    </div>
  );
};

export default Auth0PrividerWithNavigate;
