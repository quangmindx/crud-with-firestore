// selector
const btnAddUser = document.querySelector(".btn__addUser");
const addModal = document.querySelector(".add__modal");
const addModalForm = document.querySelector(".add__modal .form");

const editModal = document.querySelector(".edit__modal");
const editModalForm = document.querySelector(".edit__modal .form");

const tableUsers = document.querySelector(".table__users");

// click add user button
btnAddUser.addEventListener("click", () => {
  addModal.classList.add("modal__show");
});

// when user click anywhere outside the modal
window.addEventListener("click", (e) => {
  if (e.target == addModal || e.target == editModal) {
    addModal.classList.remove("modal__show");
    editModal.classList.remove("modal__show");
  }
});

// Click submit in add modal
addModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = addModalForm.firstName.value;
  const lastName = addModalForm.lastName.value;
  const phone = addModalForm.phone.value;
  const email = addModalForm.email.value;
  addUserToFirestore(firstName, lastName, phone, email);
});

// click submit in edit modal
let id_init;
editModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  editUser(id_init);
});

// create element render users
function createUserElement(doc) {
  const user = doc.data();
  const id = doc.id;
  const trEl = `
    <tr data-id="${id}">
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
      <td>
          <button class="btn btn__edit">Edit</button>
          <button class="btn btn__delete">Delete</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML("beforeend", trEl);
  // click edit user
  id_init = id;
  const btnEdit = document.querySelector(`[data-id='${id}'] .btn__edit`);
  btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal__show");
    editModalForm.firstName.value = user.firstName;
    editModalForm.lastName.value = user.lastName;
    editModalForm.phone.value = user.phone;
    editModalForm.email.value = user.email;
  });
  // click delete user
  const btnDelete = document.querySelector(`[data-id='${id}'] .btn__delete`);
  btnDelete.addEventListener("click", () => {
    deleteUser(id);
  });
}

function renderUser(callback) {
  // db.collection("users")
  //   .get()
  //   .then((snapShot) => {
  //     snapShot.forEach((doc) => {
  //       callback(doc);
  //     });
  //   })
  //   .catch((err) => console.log(err));
  db.collection("users").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      // console.log(change);
      if (change.type === "added") {
        callback(change.doc);
      }
      if (change.type === "removed") {
        let tr = document.querySelector(`[data-id='${change.doc.id}']`);
        tableUsers.removeChild(tr);
      }

      if (change.type === "modified") {
        let tr = document.querySelector(`[data-id='${change.doc.id}']`);
        tableUsers.removeChild(tr);
        callback(change.doc);
      }
    });
  });
}

function addUserToFirestore(first_name, last_name, phone_number, email) {
  db.collection("users")
    .add({
      firstName: first_name,
      lastName: last_name,
      phone: phone_number,
      email,
    })
    .then(() => {
      console.log("Add succesfuly");
      addModal.classList.remove("modal__show");
    })
    .catch((err) => console.log(err));
}

function deleteUser(id) {
  db.collection("users")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Delete succesfuly");
    })
    .catch((err) => console.log(err));
}

function editUser(id) {
  db.collection("users")
    .doc(id)
    .update({
      firstName: editModalForm.firstName.value,
      lastName: editModalForm.lastName.value,
      phone: editModalForm.phone.value,
      email: editModalForm.email.value,
    })
    .then(() => {
      console.log("Edit succesfuly");
      editModal.classList.remove("modal__show");
    })
    .catch((err) => console.log(err));
}

renderUser(createUserElement);
