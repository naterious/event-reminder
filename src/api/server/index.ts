import {server} from "./server";
import composeStartServer, { IServerDependencies } from "./startServer";

export default (dependencies: IServerDependencies) => {
  return {
    server,
    startServer: composeStartServer(dependencies),
  };
};