import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,deleteDoc,doc,updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0zpVuHT3i5EYrUIJHlBodTqodbnh6_0o",
    authDomain: "store-b75fb.firebaseapp.com",
    projectId: "store-b75fb",
    storageBucket: "store-b75fb.appspot.com",
    messagingSenderId: "571076537304",
    appId: "1:571076537304:web:ef70e73465b2dc5918a0ad",
    measurementId: "G-38TQFJVW0B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addbtn');
    const itemList = document.getElementById('itemList');
     loadUsers();
    addBtn.addEventListener('click', async () => {
        const user = document.getElementById('username').value.trim();
        const age = document.getElementById('age').value.trim();
console.log(user,age);

        if (user && age) {
            try {
                const docRef = await addDoc(collection(db, "user"), {
                    name: user,
                    age: age
                });
                Toastify({
                    text: "Item added successfully",
                    duration: 3000, // Duration in milliseconds
                    close: true,
                    gravity: "top", // or "bottom"
                    position: "right", // or "left"
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                }).showToast();

                addItemToList(docRef.id,user, age);

                document.getElementById('username').value = '';
                document.getElementById('age').value = '';

            } catch (error) {
                console.error("Error adding document: ", error);
                Toastify({
                    text: "Error adding item: " + error.message,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                }).showToast();
            }
        } else {
            
            Toastify({
                text: "Please enter both item and quantity",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
            }).showToast();
        }
    });

    // getData

    async function loadUsers() {
        try {
            const querySnapshot = await getDocs(collection(db, "user"));
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                addItemToList(doc.id, data.name, data.age);
            });
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }


    function addItemToList(id, username, age) {
        const li = document.createElement('li');
        li.dataset.id = id; 
    // html structure li
        li.innerHTML = `
            <input type="checkbox" class="completeCheckbox"> <!-- Add the checkbox here -->
            ${username} (${age})
            <div>
                <button class="updateBtn">Update</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;
    
       
        const completeCheckbox = li.querySelector('.completeCheckbox');
        
    
        
        completeCheckbox.addEventListener('click', () => {
            if (completeCheckbox.checked) {
                Toastify({
                    text: "Task Completed",
                    duration: 3000, // Duration in milliseconds
                    close: true,
                    gravity: "top", // or "bottom"
                    position: "right", // or "left"
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                }).showToast();
            } else {
                Toastify({
                    text: "Task Marked as incompleted",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                }).showToast();

            }
        });

        const updateBtn = li.querySelector('.updateBtn');
        const deleteBtn = li.querySelector('.deleteBtn');
        updateBtn.addEventListener('click', async () => {
            const newUsername = prompt('Update username:', username);
            const newAge = prompt('Update age:', age);
            
            if (newUsername && newAge) {
                try {
                    const docId = li.dataset.id;
                    const userRef = doc(db, "user", docId);
                    await updateDoc(userRef, {
                        name: newUsername,
                        age: newAge
                    });
                    li.firstChild.textContent = `${newUsername} (${newAge})`;
                    Toastify({
                        text: "Item updated successfully",
                        duration: 3000, // Duration in milliseconds
                        close: true,
                        gravity: "top", // or "bottom"
                        position: "right", // or "left"
                        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                    }).showToast();
    
                } catch (error) {
                    console.error("Error updating document: ", error);
                    
    Toastify({
                    text: "Error updating item: " + error.message,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                }).showToast();
                         

                }
            }
        });

        deleteBtn.addEventListener('click', async () => {
            const docId = li.dataset.id; 
            if (docId) {
                try {
                    await deleteDoc(doc(db, "user", docId));
                    itemList.removeChild(li); 
                    Toastify({
                        text: "Item deleted successfully",
                        duration: 3000, 
                        close: true,
                        gravity: "top", 
                        position: "right", 
                        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                    }).showToast();
                } catch (error) {
                    console.error("Error deleting document: ", error);
                    Toastify({
                        text: "Error deleting item: " + error.message,
                        duration: 3000,
                        close: true,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                    }).showToast();
                }
            } else {
                console.error("Document ID not found.");
                Toastify({
                    text: "Error deleting item: Document ID not found.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                }).showToast();
            }
        });

        itemList.appendChild(li);
    }



    document.getElementById('logoutbtn').addEventListener('click', function() {
        
        window.location.href = './index.html';
        Toastify({
            text: "Logged out successfully",
            duration: 3000,
            backgroundColor: "#4CAF50",
        }).showToast();
    });
});
