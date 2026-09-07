import Pusher from "pusher";

console.log("Pusher App ID:", process.env.PUSHER_APP_ID);
console.log("Pusher Key:", process.env.PUSHER_KEY);
console.log("Pusher Secret:", process.env.PUSHER_SECRET);
console.log("Pusher Cluster:", process.env.PUSHER_CLUSTER);

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});
