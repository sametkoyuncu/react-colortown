import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";

const addToFavorites = async (db, userId, collectionNameSingular, documentId) => {
  // add user favorites
  const userDocRef = doc(db, "users", userId);
  // Atomically add a new favorite to the "favorites" array field.
  await updateDoc(userDocRef, {
    favorites: arrayUnion({ type: collectionNameSingular, id: documentId }),
  });

  // increment collection likes count
  const dataRef = doc(db, `${collectionNameSingular}s`, documentId);
  await updateDoc(dataRef, {
    likes: increment(-1),
  });
};

export default addToFavorites;
