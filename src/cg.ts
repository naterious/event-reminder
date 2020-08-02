import composeApi from "./api";
import composeApplication from "./application";
import composeInfrastructure from "./infrastructure";

export default () => {
  const infrastructure = composeInfrastructure();
  const application = composeApplication({
    ...infrastructure,
  });
  const api = composeApi({
    ...infrastructure,
    ...application,
  });

  return {
    ...infrastructure,
    ...application,
    ...api,
    startServer: api.server.startServer,
  };
};