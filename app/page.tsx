import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default async function Home() {
  const { getOrganization, getUser, getAccessToken } = getKindeServerSession();
  const user = await getUser();
  const accessToken = await getAccessToken();
  // const book = await fetchBook("OL24224314M");

  // console.log("book", book);

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
        John left some clues about the book in his user profile on Kinde Include
        the book details when returning data from the workflow to have it render
        correctlyThe workflow is connected to your log in
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
      <pre>{JSON.stringify(accessToken, null, 2)}</pre>
    </div>
  );
}
