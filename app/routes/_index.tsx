import { redirect, type MetaFunction } from "@remix-run/node";
import Dashboard from "./dashboard";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader = () => {
  return redirect("/login");
};
export default function Index() {
  return (
    <Dashboard />
  );
}


