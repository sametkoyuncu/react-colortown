import usePagination from "./Pagination";
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
  getCollectionByUserId,
  addToFavorites,
  removeFromFavorites,
  getFavoriteIds,
  getFavoritesByUserId,
  incrementLikes,
  decrementLikes,
  getDocsByTagName,
};
