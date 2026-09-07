import { getSession } from "@/lib/auth";
import { ErrorResource } from "@/lib/errors/app-error";
import { Errors } from "@/lib/errors/errors";
import { pusherServer } from "@/lib/pusher/pusher.server";
import { realtimePublisher } from "@/lib/realtime/realtime.publisher";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const body = await request.text();
  const params = new URLSearchParams(body);

  const socketId = params.get("socket_id");
  const channelName = params.get("channel_name");

  if (!socketId || !channelName) {
    return new Response("Invalid Request", {
      status: 400,
    });
  }
  const hasAccess = realtimePublisher.validateAuthChananelAccess(
    session.id,
    channelName,
  );
  if (!hasAccess) {
    throw Errors.unauthorized("Not allowed", ErrorResource.REALTIME);
  }
  const authResponse = pusherServer.authorizeChannel(socketId, channelName);
  return Response.json(authResponse);
}
