import { FastifyPluginAsync } from "fastify";

const vacanciesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/vacancies",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            text: { type: "string" },
            page: { type: "integer", minimum: 0 },
            per_page: { type: "integer", minimum: 1, maximum: 100 },
          },
          required: ["text"],
          additionalProperties: true,
        },
      },
    },
    async (request, reply) => {
      const q = request.query as {
        text: string;
        page?: number;
        per_page?: number;
        [k: string]: any;
      };

      try {
        const data = await fastify.hhClient.searchVacancies({
          text: q.text,
          page: q.page ?? 0,
          per_page: q.per_page ?? 20,
        } as any);
        return data;
      } catch (err: any) {
        request.log.error({ err }, "searchVacancies failed");
        return reply.status(502).send({ error: "vacancy_search_failed", details: err?.message });
      }
    },
  );

  fastify.post(
    "/vacancies/:id/apply",
    {
      schema: {
        params: {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            resumeId: { type: "string" },
            message: { type: "string" },
          },
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { resumeId, message } = (request.body as any) ?? {};

      try {
        let rid = resumeId;
        if (!rid) {
          const my = await fastify.hhClient.getMyResumes();
          rid = my.items?.[0]?.id;
        }
        if (!rid) return reply.status(400).send({ error: "resume_required" });

        await fastify.hhClient.applyVacancy({
          vacancy_id: id,
          resume_id: rid,
          message,
        });
        return { ok: true };
      } catch (err: any) {
        request.log.error({ err }, "applyVacancy failed");
        return reply.status(502).send({ error: "vacancy_apply_failed", details: err?.message });
      }
    },
  );
};

export default vacanciesRoutes;

