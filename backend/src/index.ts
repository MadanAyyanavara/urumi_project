import app from "./server";
import { env } from "./config/env";

const port = Number(env.PORT);

app.listen(port, () => {
  console.log(
    `[backend] running on port ${port} (${env.NODE_ENV})`
  );
});
