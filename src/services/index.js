import { usePagination, usePaginationWithFilterTags } from "./Pagination";
import getCollectionByUserId from "./GetCollectionByUserId";
import getDocsByTagName from "./GetDocsByTagName";
import {
  addToFavorites,
  removeFromFavorites,
  incrementLikes,
  decrementLikes,
  getFavoriteIds,
  getFavoritesByUserId,
} from "./FavoritesService";

export {
  usePagination,
  usePaginationWithFilterTags,
  getCollectionByUserId,
  addToFavorites,
  removeFromFavorites,
  getFavoriteIds,
  getFavoritesByUserId,
  incrementLikes,
  decrementLikes,
  getDocsByTagName,
};
