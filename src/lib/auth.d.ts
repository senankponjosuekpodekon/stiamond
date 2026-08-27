import "@auth/core/types";

declare module "@auth/core/types" {
  interface User {
    role: string;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}
