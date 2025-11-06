import fp from "fastify-plugin";
import cors from "@fastify/cors";
import { env } from "../config/env.js";

export default fp(async (fastify) => {
	const origin = env.corsOrigin?.split(",").map((o: string) => o.trim()) ?? [
		"http://localhost:5173",
	];

	await fastify.register(cors, {
		origin,
		credentials: true,
	});
});
