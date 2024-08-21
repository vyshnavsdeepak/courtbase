import { EventSchemas, Inngest } from "inngest";

import type { EventsMap } from "./event-types";
import { kyselyMiddleware as kysele } from "./middlewares/kysely";

export const inngest = new Inngest({
  id: "courtbase",
  schemas: new EventSchemas().fromRecord<EventsMap>(),
  middleware: [kysele],
});

export const inn: typeof inngest = inngest;
