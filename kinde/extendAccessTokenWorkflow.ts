import {
  accessTokenCustomClaims,
  onUserTokenGeneratedEvent,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
  },
};

const handler = {
  async handle(event: onUserTokenGeneratedEvent) {
    const accessToken = accessTokenCustomClaims<{
      hello: string;
      ipAddress: string;
    }>();

    accessToken.hello = "Hello there!";
    accessToken.ipAddress = event.request.ip;
  },
};

export default handler;
