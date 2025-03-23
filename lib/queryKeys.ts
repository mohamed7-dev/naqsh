const queryKeys = {
  getImages: ["images"],
  uploadImage: ["uploadImage"],
  getProject: (id: string) => ["project", { id }],
  getProjects: ["projects"],
  getTemplates: ["templates"],
};

export { queryKeys };
