import { Button } from "@/components/ui/button";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default async function Home() {
  const { getOrganization, getUser, getAccessToken } = getKindeServerSession();
  const user = await getUser();
  const accessToken = await getAccessToken();

  if (!user) {
    return (
      <div>
        <Button asChild>
          <LoginLink>Start</LoginLink>
        </Button>
      </div>
    );
  }
  const org = await getOrganization();
  if (org?.orgCode === "org_15a14124dae") {
    return (
      <div>
        <p>Check this Library's properties on Kinde.</p>
        <p>There is information on Kai's favourite book...</p>
        <p>
          ...add the book data to the accessToken via <code>Workflow.ts</code>{" "}
          for a hint on where to find the key.
        </p>
        <Image
          src={`https://covers.openlibrary.org/b/id/${accessToken.book.data.covers[0]}-L.jpg`}
          width={200}
          height={300}
          alt={""}
        />
        <pre>ISBN10: {accessToken.book.data.isbn_10[0]}</pre>
        <p>
          The location of the book is hidden in the ISBN10 Seat row: ISBN[3]
          left: ISBN10[7]Go to the seat to find the key!!!
        </p>
      </div>
    );
  }
  return (
    <div>
      <pre>{JSON.stringify(org, null, 2)}</pre>
      <p>Nothing here...</p>
      {/* <pre>{JSON.stringify(accessToken, null, 2)}</pre> */}
    </div>
  );
}
