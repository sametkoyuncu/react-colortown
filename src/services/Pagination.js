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
  orderField = "timeStamp",
  orderType = "asc",
  docsLimit = 12
) => {
  const list = [];
  let q;
  switch (queryType) {
    case "first":
      // Query the first page of docs
      q = query(collection(db, collectionName), orderBy(orderField, orderType), limit(docsLimit));
      break;
    case "next":
      // Query the next page of docs
      q = query(
        collection(db, collectionName),
        orderBy(orderField, orderType),
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

const usePaginationWithFilterTags = async (
  collectionName,
  queryType,
  filterTags,
  orderField = "timeStamp",
  orderType = "asc",
  docsLimit = 12
) => {
  const list = [];
  let q;
  switch (queryType) {
    case "first":
      // Query the first page of docs
      q = query(
        collection(db, collectionName),
        where("tags", "array-contains-any", [...filterTags]),
        orderBy(orderField, orderType),
        limit(docsLimit)
      );
      break;
    case "next":
      // Query the next page of docs
      q = query(
        collection(db, collectionName),
        where("tags", "array-contains-any", [...filterTags]),
        orderBy(orderField, orderType),
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
  console.log(list);
  return list;
};

export { usePagination, usePaginationWithFilterTags };
