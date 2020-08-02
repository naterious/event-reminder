import composeIncomingMessageValidator from "./incomingMessageValidator";

import { IApiDependencies } from "..";

export default (dependencies: IApiDependencies) => {
  const incomingMessageValidator = composeIncomingMessageValidator(dependencies);

  return {
    incomingMessageValidator,
  };
};