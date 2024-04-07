import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://fnrzdzsttfvgmxrhgxzv.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZucnpkenN0dGZ2Z214cmhneHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzNDUwNjYsImV4cCI6MjAyNzkyMTA2Nn0.3hd7KNQNKmTyBvNlPIb8NUbBudcnngOqcZAGCHGvi5M";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public", // this can be overridden by passing `meta.schema` to data hooks.
  },
  auth: {
    persistSession: true,
  },
});
