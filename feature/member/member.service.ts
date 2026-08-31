import { Role, UserStatus } from "@/generated/prisma/enums";
import { ErrorResource } from "@/lib/errors/app-error";
import { normalizeError } from "@/lib/errors/normalizeError";
import prisma from "@/lib/prisma";

export const memberService = {
  async getAllMembers() {
    try {
      const member = await prisma.user.findMany({
        where: {
          status: UserStatus.ACTIVE,
          role: Role.MEMBER,
        },
        select: {
          id: true,

          email: true,
        },
        orderBy: {
          email: "asc",
        },
      });
      return member;
    } catch (error) {
      throw normalizeError(error, ErrorResource.USER);
    }
  },
};
