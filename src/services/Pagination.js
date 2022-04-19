// I named 'usePagination' but I don't know this is a hook or something else.
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";

let lastVisible;
let documentSnapshots;

// type must be "first" or "next".
//  first: first 12 document from collection.
//  next: next 12 document from collection.
const usePagination = async (
  collectionName,
  queryType,
  filterTags,
  sortField = "timeStamp",
  sortType = "asc",
  docsLimit = 12
) => {
  const list = [];
  let q;

  if (queryType === "first") {
    if (!filterTags.length) {
      q = query(collection(db, collectionName), orderBy(sortField, sortType), limit(docsLimit));
    } else {
      q = query(
        collection(db, collectionName),
        where("tags", "array-contains-any", [...filterTags]),
        orderBy(sortField, sortType),
        limit(docsLimit)
      );
    }
  } else if (queryType === "next") {
    if (!filterTags.length) {
      q = query(
        collection(db, collectionName),
        orderBy(sortField, sortType),
        startAfter(lastVisible),
        limit(docsLimit)
      );
    } else {
      q = query(
        collection(db, collectionName),
        where("tags", "array-contains-any", [...filterTags]),
        orderBy(sortField, sortType),
        startAfter(lastVisible),
        limit(docsLimit)
      );
    }
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
