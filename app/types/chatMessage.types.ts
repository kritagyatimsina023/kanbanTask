import { Role } from "@/generated/prisma/enums";

export type ChatMessageActionState = {
  success: boolean;
  message: string;
  fieldErrors?: {
    content?: string[];
    roomId?: string[];
  };
};
export type RoomMember = {
  id: string;
  user: {
    id: string;
    email: string;
    role: Role;
  };
};
export type Room = {
  id: string;
  name: string;
  createdById: string | null;
  _count: {
    members: number;
  };
  members: RoomMember[];
};
export type messages = {
  id: string;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
    email: string;
  };
};
// export type Room = Prisma.ChatRoomGetPayload<{
//   include: {
//     _count: {
//       select: {
//         members: true;
//       };
//     };
//     members: {
//       select: {
//         id: true;
//         user: {
//           select: {
//             id: true;
//             email: true;
//             name: true;
//           };
//         };
//       };
//     };
//   };
// }>;

// export type messages = Prisma.ChatMessageGetPayload<{
//   include: {
//     sender: {
//       select: {
//         id: true;
//         email: true;
//       };
//     };
//   };
// }>;
