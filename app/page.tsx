import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getOrganization, getUser } = getKindeServerSession();
  const user = await getUser();

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
      </div>
    );
  }
  return (
    <div>
      <pre>{JSON.stringify(org, null, 2)}</pre>
    </div>
  );
}
