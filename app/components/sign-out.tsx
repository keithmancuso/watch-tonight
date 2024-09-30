import { signOut, auth } from "@/auth"


export default async function SignOut() {

    const session = await auth()

    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            {session?.user?.email} <button type="submit">Sign Out</button>
        </form>
    )
}