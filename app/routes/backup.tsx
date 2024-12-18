import { redirect, type MetaFunction } from "@remix-run/node";
import Dashboard from "./dashboard";

export const meta: MetaFunction = () => {
    return [
        { title: "Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export default function Backup() {
    return (
        <Dashboard />
    );
}


