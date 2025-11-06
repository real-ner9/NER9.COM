import fp from "fastify-plugin";
import { hhClient, type HHClient } from "../services/hhClient.js";

declare module "fastify" {
	interface FastifyInstance {
		hhClient: HHClient;
	}
}

export default fp(async (fastify) => {
	fastify.decorate("hhClient", hhClient);
});
