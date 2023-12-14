export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: null,
  });
  return {
    user,
  };
});
