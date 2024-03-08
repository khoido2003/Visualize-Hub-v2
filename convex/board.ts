import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const images = [
  "/1.svg",
  "/2.svg",
  "/3.svg",
  "/4.svg",
  "/5.svg",
  "/6.svg",
  "/7.svg",
  "/8.svg",
  "/9.svg",
];

/////////////////////////////////////

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated!");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

///////////////////////////////////

export const get = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    // const board = ctx.db
    //   .query("boards")
    //   .filter((q) => q.eq(q.field("_id"), args.id));

    const board = ctx.db.get(args.id);

    return board;
  },
});

/////////////////////////////

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated!");
    }

    // Check to delete the favourite relation as well
    const existingFavourite = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", identity.subject).eq("boardId", args.id)
      )
      .unique();

    if (existingFavourite) {
      await ctx.db.delete(existingFavourite._id);
    }

    await ctx.db.delete(args.id);
  },
});

//////////////////////////////////////

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated!");
    }

    const title = args.title.trim();
    if (!title) {
      throw new Error("Title cannot be empty!");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be more than 60 characters");
    }

    const board = await ctx.db.patch(args.id, { title: args.title });

    return board;
  },
});

/////////////////////////////////////////

export const favourite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated!");
    }

    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found!");
    }

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (existingFavourite) {
      throw new Error("Boardalready favourited");
    }

    await ctx.db.insert("userFavourites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

////////////////////////////////

export const unfavourite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated!");
    }

    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found!");
    }

    const userId = identity.subject;
    const existingFavourite = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (!existingFavourite) {
      throw new Error("Favourited board not found!");
    }

    await ctx.db.delete(existingFavourite._id);

    return board;
  },
});
