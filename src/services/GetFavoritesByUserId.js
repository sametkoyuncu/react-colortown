import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const GetFavoritesByUserId = async (userId) => {
  const list = [];

  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  const userFavorites = userDoc.data().favorites;

  const promises = [];

  userFavorites.forEach((item) => {
    switch (item.type) {
      case "color":
        promises.push(getDoc(doc(db, "colors", item.id)));
        break;
      case "gradient":
        promises.push(getDoc(doc(db, "gradients", item.id)));
        break;
      case "palette":
        promises.push(getDoc(doc(db, "palettes", item.id)));
        break;
      default:
        break;
    }
  });

  const favoriteDocs = await Promise.all(promises); // Array of Document Snapshots

  favoriteDocs.forEach((document) => {
    list.push({ id: document.id, ...document.data() });
  });

  return list;
};

export default GetFavoritesByUserId;
