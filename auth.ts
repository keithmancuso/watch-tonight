import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import OpenAI from "openai"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [Google],
  events: {
    async signIn({ user }) {
      const client = await pool.connect()
      try {
        // Check if the user has a thread
        const result = await client.query(
          'SELECT thread FROM users WHERE id = $1',
          [user.id]
        )

        if (result.rows.length > 0 && result.rows[0].thread) {
          // Thread exists, do nothing
          return
        }

        // Create a new thread
        const thread = await openai.beta.threads.create()

        // Update the user's thread in the database
        await client.query(
          'UPDATE users SET thread = $1 WHERE id = $2',
          [thread.id, user.id]
        )
      } finally {
        client.release()
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      session.thread = user.thread
      return session
    },
  },
})

