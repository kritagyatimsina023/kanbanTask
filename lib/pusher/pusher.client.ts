// "use client";
// import Pusher from "pusher-js";

// export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
//     cluster:process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
//     channelAuthorization;{
//         endpoint:"/api/pusher/auth",
//         transport:"ajax"
//     }
// });

"use client";

import Pusher from "pusher-js";

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  channelAuthorization: {
    endpoint: "/api/pusher/auth",
    transport: "ajax",
  },
});
