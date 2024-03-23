import { ConvexHttpClient } from "convex/browser";
import { Liveblocks } from "@liveblocks/node";
import { auth, currentUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  // Receive the room Id sent by the client
  const { room } = await request.json();

  // Check the board with the coresponding id
  const board = await convex.query(api.board.get, { id: room });

  // If the board id is not in the current organization then not allow to access
  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  // Acces the user information from convex
  const userInfo = {
    name: user.firstName + " " + user.lastName || "Teamate",
    picture: user.imageUrl,
  };

  // Pass the user information to the liveblock session
  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
