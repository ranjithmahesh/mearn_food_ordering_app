import { CircleUserRound, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        {isAuthenticated ? (
          <span className=" flex items-center font-bold gap-2 ">
            <CircleUserRound className="text-orange-500 " />
            {user?.email}
          </span>
        ) : (
          <SheetTitle>
            <span>Welcome to MearnEats.com!</span>
          </SheetTitle>
        )}
        <Separator /> 
        <SheetDescription className="flex flex-col gap-4 ">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              className="flex-1 bg-orange-500 font-bold  "
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
