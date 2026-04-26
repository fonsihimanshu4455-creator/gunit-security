import "next-auth";
import "next-auth/jwt";

type AppRole = "ADMIN" | "EDITOR" | "CLIENT";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: AppRole;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: AppRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: AppRole;
  }
}
