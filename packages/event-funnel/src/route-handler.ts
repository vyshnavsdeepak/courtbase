import { serve } from "inngest/next";

import { helloWorld } from "./functions/hello-world";
import { inngest } from "./lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld],
});
