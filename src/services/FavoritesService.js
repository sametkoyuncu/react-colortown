import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";

const addToFavorites = async (db, userId, collectionNameSingular, documentId) => {
  // add user favorites
  const userDocRef = doc(db, "users", userId);
  // Atomically add a new favorite to the "favorites" array field.
  await updateDoc(userDocRef, {
    favorites: arrayUnion({ type: collectionNameSingular, id: documentId }),
  });
};

const removeFromFavorites = async (db, userId, collectionNameSingular, documentId) => {
  // remove user favorites
  const userDocRef = doc(db, "users", userId);
  // Atomically remove a avorite to the "favorites" array field.
  await updateDoc(userDocRef, {
    favorites: arrayRemove({ type: collectionNameSingular, id: documentId }),
  });
};

const incrementLikes = async (db, collectionNameSingular, documentId) => {
  // increment collection likes count
  const dataRef = doc(db, `${collectionNameSingular}s`, documentId);
  await updateDoc(dataRef, {
    likes: increment(1),
  });
};

const decrementLikes = async (db, collectionNameSingular, documentId) => {
  // decrement collection likes count
  const dataRef = doc(db, `${collectionNameSingular}s`, documentId);
  await updateDoc(dataRef, {
    likes: increment(-1),
  });
};

const getFavoriteIds = async (db, userId) => {
  const colors = [];
  const gradients = [];
  const palettes = [];

  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  const userFavorites = userDoc.data().favorites;

  userFavorites.forEach((favorite) => {
    switch (favorite.type) {
      case "color":
        colors.push(favorite.id);
        break;
      case "gradient":
        gradients.push(favorite.id);
        break;
      case "palette":
        palettes.push(favorite.id);
        break;
      default:
        break;
    }
  });

  return { colors, gradients, palettes };
};

const getFavoritesByUserId = async (db, userId) => {
  const list = [];

  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  const userFavorites = userDoc.data().favorites;

  const promises = [];

  userFavorites.forEach((item) => {
    promises.push(getDoc(doc(db, `${item.type}s`, item.id)));
  });

  const favoriteDocs = await Promise.all(promises); // Array of Document Snapshots

  favoriteDocs.forEach((document) => {
    list.push({ id: document.id, ...document.data() });
  });

  return list;
};

export {
  addToFavorites,
  removeFromFavorites,
  incrementLikes,
  decrementLikes,
  getFavoriteIds,
  getFavoritesByUserId,
};
