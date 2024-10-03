import { signIn } from "@/auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button type="submit" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Sign in with Google</button>
        </form>
    )
} 