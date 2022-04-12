import { getDoc, doc } from "firebase/firestore";

const GetFavoritesByUserId = async (db, userId) => {
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

export default GetFavoritesByUserId;
