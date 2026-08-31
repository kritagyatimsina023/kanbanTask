export type chatRoomActionState = {
  success: boolean;
  message?: string;
  error?: string | null;
  fieldErrors?: {
    name?: string[];
    membersIds?: string[];
    general?: string[];
  };
};

export type CreateChatRoomInput = {
  name: string;
  memberIds: string[];
};

export type RoomType = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string | null;
  createdBy: {
    id: string;
    email: string;
  } | null;
};
