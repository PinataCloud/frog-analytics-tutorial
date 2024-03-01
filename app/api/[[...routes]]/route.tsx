/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { handle } from "frog/vercel";
import { PinataFDK } from "pinata-fdk";

type State = {
  count: number;
};

const pinataFdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: process.env.GATEWAY_URL as string,
});

const app = new Frog<State>({
  basePath: "/api",
  initialState: {
    count: 0,
  },
  // hubApiUrl: "https://hub.pinata.cloud"
});

app.use("/", pinataFdk.analyticsMiddleware({ frameId: "frog-refactor-2", customId: "frog-refactor-custom-id-2"}));

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
app.frame("/", (c) => {
  const { buttonValue, deriveState } = c;
  const state = deriveState((previousState) => {
    if (buttonValue === "inc") previousState.count++;
    if (buttonValue === "dec") previousState.count--;
  });
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #6FD392, #83E1C8)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          fontSize: "64px",
        }}
      >
        <div style={{
          fontSize: "136px"
        }}>🐸</div>
        Ribbits: {state.count}
      </div>
    ),
    intents: [
      <Button value="dec">Less Ribbits</Button>,
      <Button value="inc">More Ribbits</Button>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);
