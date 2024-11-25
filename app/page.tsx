import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RefreshButton } from "./refresh-button";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser<{ bookCode: string; bookName: string }>();

  return (
    <div className="p-8">
      <div className="rounded-lg bg-slate-50 border-slate-200 border font-mono p-4 text-sm">
        <div className="mb-4">
          <p className="font-semibold">Your tasks</p>
          <ol className="list-decimal pl-12">
            <li>Set up the LoginLink and LogoutLink for authentication</li>
            <li>Login to retrieve the book code below</li>
            <li>Use the book code in `api/webhook/route.ts`</li>
            <li>Logout and login again to trigger the webhook</li>
            <li>The book name is the final password</li>
            <li>
              Enter the final password to obtain the coordinates of the
              skateboard
            </li>
          </ol>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Your clues</p>
          <ol className="list-decimal pl-12">
            <li>Email: peter+1@kinde.com</li>
            <li>Password: Password123!</li>
          </ol>
        </div>
      </div>

      <div className="flex gap-2 my-4">
        {/* TODO: LoginLink */}
        <Button asChild>
          <a href="#">Login</a>
        </Button>
        {/* TODO: LogoutLink */}
        <Button variant={"outline"} asChild>
          <a href="#">Logout</a>
        </Button>
        <RefreshButton />
      </div>

      <pre className="rounded-lg p-4 text-sm border">
        {user
          ? JSON.stringify(user, null, 2)
          : "Not logged in. Log in to trigger the webhook."}
      </pre>

      {/* <div className="space-y-1 flex flex-col mt-8">
        <label className="font-medium">The final password</label>
        <input type="password" className="border p-2 rounded-lg outline-none" />
      </div>
      <Button className="mt-4">Submit</Button> */}
    </div>
  );
}
