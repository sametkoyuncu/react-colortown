import { collection, query, where, getDocs } from "firebase/firestore";

const getByUserId = async (db, collectionName, userId) => {
  const list = [];
  const q = query(collection(db, collectionName), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, ...doc.data() });
  });

  return list;
};

export default getByUserId;
