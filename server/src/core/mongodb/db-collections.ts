export const dbCollections = Object.freeze({
  users: "users",
  support_tickets: "support_tickets",
  agents: "agents",
});

export type CollectionNames = keyof typeof dbCollections;
