import { ActionFunction, type MetaFunction } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";
interface ErrorType {
    error?: string[]
}

export const meta: MetaFunction = () => {
    return [
        { title: "login form" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export const action: ActionFunction = async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    const username = formData.get("username");
    const password = formData.get("password");
    if (!username || !password) {
        return { error: "Please fill in all fields" };
    }
    const user = {
        username: "anas",
        password: "12345",
    };

    if (username === user.username && password === user.password) {
        const session = await getSession();
        session.set("userId", "12345");
        return redirect("/dashboard/products", {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    } else {
        return { error: "Invalid credentials" };
    }
}
export default function Login() {
    const actionData = useActionData<ErrorType>();
    return (
        <div className=" w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="bg-slate-200 shadow-2xl p-32">
                <h1>yes ok</h1>
                <Form method="post">
                    <label>
                        Username: <input type="text" name="username" />
                    </label>
                    <br />
                    <br />
                    <label>
                        Password: <input type="password" name="password" />
                    </label>
                    <br />
                    <br />
                    <div className="text-center">
                        <button className="bg-blue-500 px-6 py-4 rounded-2xl" type="submit">Login</button>
                    </div>
                </Form>
            </div>
            {actionData?.error && <p>{actionData.error}</p>}
        </div>
    );
}


