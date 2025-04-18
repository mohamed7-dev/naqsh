const queryKeys = {
  getImages: ["images"],
  uploadImage: ["uploadImage"],
  getProject: (id: string) => ["project", { id }],
  updateProjectMutation: (id: string) => ["updateProjectMutation", { id }],
  getProjects: ["projects"],
  getTemplates: ["templates"],
};

export { queryKeys };
