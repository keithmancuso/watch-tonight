import { signOut, auth } from "@/auth"


export default async function SignOut() {

    const session = await auth()

    return (
        <div className="flex justify-end w-full mt-4 pr-4">
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
                className="flex items-center gap-2"
            >
                <div>{session?.user?.email}</div>
                <button type="submit" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Sign Out</button>
            </form>
        </div>
    )
}


