import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { clientRouter as posleClientRouter } from "./routers/client";
import { petsRouter } from "./routers/pets";
import { visitsRouter } from "./routers/visits";
import { subscriptionsRouter } from "./routers/subscriptions";
import { uploadRouter } from "./routers/upload";
import { bookingRouter } from "./routers/booking";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  posleClient: posleClientRouter,
  pets: petsRouter,
  visits: visitsRouter,
  subscriptions: subscriptionsRouter,
  upload: uploadRouter,
  booking: bookingRouter,
});

export type AppRouter = typeof appRouter;
