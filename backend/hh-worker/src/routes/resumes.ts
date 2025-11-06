import { FastifyPluginAsync } from "fastify";

const resumesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/resumes", async (request, reply) => {
    try {
      const data = await fastify.hhClient.getMyResumes();
      return data;
    } catch (err: any) {
      request.log.error({ err }, "getMyResumes failed");
      return reply.status(502).send({ error: "resumes_failed", details: err?.message });
    }
  });
};

export default resumesRoutes;

