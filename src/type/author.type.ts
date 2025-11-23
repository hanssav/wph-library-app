export type AuthorsResponse = {
  success: boolean;
  message: string;
  data: {
    authors: Author[];
  };
};

export type Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};
