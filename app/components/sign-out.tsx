import { signOut, auth } from "@/auth"


export default async function SignOut() {

    const session = await auth();

    return (
        <div className="">
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
                className="flex items-center gap-2"
            >

                <button type="submit" className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Sign Out</button>
            </form>
        </div>
    )
}


