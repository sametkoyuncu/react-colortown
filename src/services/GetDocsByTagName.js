// import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const getDocsByTagName = async (db, collectionName = "colors", tagNames = ["orange", "red"]) => {
  const list = [];
  const q = query(
    collection(db, collectionName),
    where("tags", "array-contains-any", [...tagNames])
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    list.push({ id: doc.id, ...doc.data() });
  });

  // tag
  // getDocsByTagName(db)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err))
  //   .finally(() => console.log("finally"));

  return list;
};

export default getDocsByTagName;
