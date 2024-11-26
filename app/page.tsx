import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RefreshButton } from "./refresh-button";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser<{ bookCode: string; bookName: string }>();

  return (
    <div className="p-8 py-40">
      <div className="text-center pb-24">
        <h2 className="text-5xl font-medium mb-8 tracking-tight">
          Kinde
          <br />
          Speedrun
        </h2>
        <h1 className="text-[180px] leading-[175px] tracking-tight font-medium">
          The finals
        </h1>
        <p className="text-2xl max-w-lg mx-auto mt-6">
          Your goal is to uncover the final password and claim the prize
        </p>
      </div>
      <hr className="mb-24" />

      <h2 className="tracking-tight text-7xl mb-12 font-medium text-center">
        Tasks
      </h2>
      <div className="mx-auto max-w-3xl text-xl">
        <ol className="list-decimal pl-12 font-medium space-y-2">
          <li>Set up the LoginLink and LogoutLink for authentication</li>
          <li>Sign in to retrieve the book code below</li>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: peter+1@kinde.com</li>
            <li>Password: Password123!</li>
          </ul>
          <li>Use the book code in `api/webhook/route.ts`</li>
          <li>Sign out and sign in again to trigger the webhook</li>
          <li>Click the refresh button to update the response</li>
          <li>The book name is the final password</li>
          <li>
            Enter the final password to obtain the co-ordinates of the
            skateboard
          </li>
        </ol>

        <hr className="my-16" />

        <div className="mb-8 gap-12 flex">
          <div className="flex gap-4">
            {/* TODO: LoginLink */}
            <Button asChild>
              <a href="#">Sign in</a>
            </Button>
            {/* TODO: LogoutLink */}
            <Button variant={"secondary"} asChild>
              <a href="#">Sign out</a>
            </Button>
          </div>
          <RefreshButton />
        </div>

        <h3 className="font-medium text-base mb-2">Response</h3>
        <div className="rounded-lg p-4 text-sm border overflow-auto">
          {user ? (
            <pre>{JSON.stringify(user, null, 2)}</pre>
          ) : (
            "Not logged in. Log in to trigger the webhook."
          )}
        </div>
      </div>
    </div>
  );
}
