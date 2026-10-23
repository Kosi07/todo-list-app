// Absolute image URLs, all in one place so they're easy to swap.
const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  alex: "https://i.pravatar.cc/256?img=12",
  maya: "https://i.pravatar.cc/256?img=47",
  office: U("photo-1518455027359-f3f8164ba6bd"),
  run: U("photo-1476480862126-209bfaa8edc8"),
  meal: U("photo-1546069901-ba9599a7e63c"),
  books: U("photo-1512820790803-83ca734da794"),
};
