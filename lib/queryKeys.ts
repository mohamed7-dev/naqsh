const queryKeys = {
  getImages: ["images"],
  uploadImage: ["uploadImage"],
  getProject: (id: string) => ["project", { id }],
};

export { queryKeys };
