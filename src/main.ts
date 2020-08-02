import cg from "./cg";

export const main: () => Promise<void> = async () => {
  const {
    startServer,
    server,
    processMessagesService,
  } = cg();

  startServer(server.server);
  return processMessagesService();
};