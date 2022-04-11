// I named 'usePagination' but I don't know if this is a hook or something else.
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

let lastVisible;
let documentSnapshots;

// type must be "first" or "next".
//  first: first 8 document from collection.
//  next: next 8 document from collection.
const usePagination = async (collectionName, type) => {
  const list = [];
  let q;
  switch (type) {
    case "first":
      // Query the first page of docs
      q = query(collection(db, collectionName), orderBy("timeStamp"), limit(8));
      break;
    case "next":
      // Query the next page of docs
      q = query(
        collection(db, collectionName),
        orderBy("timeStamp"),
        startAfter(lastVisible),
        limit(8)
      );
      break;
    default:
      break;
  }

  documentSnapshots = await getDocs(q);

  // Get the last visible document
  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  documentSnapshots.forEach((document) => {
    list.push({ id: document.id, ...document.data() });
  });

  return list;
};

export default usePagination;
