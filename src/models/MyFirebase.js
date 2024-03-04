import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, addDoc, deleteDoc, updateDoc, query, orderBy} from "firebase/firestore";

function MyFirebase(){
const firebaseConfig = {
    apiKey: "AIzaSyCq7Ah7GAmm5BLi1I5IdtU_uDyWF1NaGxY",
    authDomain: "shoppingcart-16ec2.firebaseapp.com",
    projectId: "shoppingcart-16ec2",
    storageBucket: "shoppingcart-16ec2.appspot.com",
    messagingSenderId: "771832159971",
    appId: "1:771832159971:web:aad410bf3023a1caf8afd6"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const me = {};

  me.getProducts = async () => {
    const productsRef = collection(db, "Products");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs
    .map(doc => ({ ...doc.data(), id: doc.id }))
    .sort((a, b) => a.timestamp - b.timestamp); 
    return products;
  };

  me.createProduct = async (newProduct) => {
    const timestamp = Date.now(); 
    await addDoc(collection(db, "Products"), { ...newProduct, timestamp });
  };

  me.deleteProduct = async (productId) => {
    const productRef = doc(db, "Products", productId);
    await deleteDoc(productRef);
  };

  me.updateProduct = async (productId, updatedProductData) => {
    const productRef = doc(db, "Products", productId);
    await updateDoc(productRef, updatedProductData);
  };
  return me;
}

export const myFirebase = new MyFirebase();