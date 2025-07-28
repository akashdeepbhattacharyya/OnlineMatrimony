export type Match = {
  content: content[];
};

export type content = {
  id: string;
  fullName: string;
  gender: string;
  country: string;
  photoUrls: [string];
  createdAt: string;
  updatedAt: string;
};
