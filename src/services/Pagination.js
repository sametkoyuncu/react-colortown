// I named 'usePagination' but I don't know if this is a hook or something else.
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

let lastVisible;
let documentSnapshots;

// type must be "first" or "next".
//  first: first 12 document from collection.
//  next: next 12 document from collection.
const usePagination = async (collectionName, queryType, docsLimit = 12) => {
  const list = [];
  let q;
  switch (queryType) {
    case "first":
      // Query the first page of docs
      q = query(collection(db, collectionName), orderBy("timeStamp"), limit(docsLimit));
      break;
    case "next":
      // Query the next page of docs
      q = query(
        collection(db, collectionName),
        orderBy("timeStamp"),
        startAfter(lastVisible),
        limit(docsLimit)
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
