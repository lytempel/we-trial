import { useState, useEffect, useRef } from "react";
import "./App.css";
import type { User } from "./types/user";
import Spinner from "./components/Spinner";
import UsersList from "./components/UsersList/UsersList";
import { FaUserPlus } from "react-icons/fa6";
import UserForm from "./components/UserForm/UserForm";
import { MODE, USERS_API_URL, type Mode } from "./constants";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFormMode, setUserFormMode] = useState<Mode | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(USERS_API_URL);
        const data = await res.json();

        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (userFormMode === MODE.ADD || userFormMode === MODE.EDIT) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [userFormMode, editingUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);

    const filteredItems = users.filter((user: User) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };

  const onAddNew = () => {
    setUserFormMode(MODE.ADD);
  };

  const switchToEditMode = (user: User) => {
    setUserFormMode(MODE.EDIT);
    setEditingUser({ ...user });
  };

  const closeForm = () => {
    setUserFormMode(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addUser = async (newUser: User) => {
    await fetch(USERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const updatedUsers = [...filteredUsers, { ...newUser, id: Date.now() }];

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    closeForm();
  };

  const updateList = (list: User[], updated: User) =>
    list.map((user) => (user.id === updated.id ? updated : user));

  const updateUser = async (updatedUser: User) => {
    await fetch(`${USERS_API_URL}/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    setUsers((prev) => updateList(prev, updatedUser));
    setFilteredUsers((prev) => updateList(prev, updatedUser));
    closeForm();
  };

  const deleteUser = async (id: number) => {
    await fetch(`${USERS_API_URL}/${id}`, {
      method: "DELETE",
    });

    setUsers((prev) => prev.filter((user) => user.id !== id));
    setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="container">
      <h1>User Management System</h1>
      <div className="actions">
        <button className="addNewUser" onClick={() => onAddNew()}>
          <FaUserPlus /> <span>Add new</span>
        </button>
        <input
          className="search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Type a name to search"
        />
      </div>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <UsersList
          users={filteredUsers}
          onDelete={deleteUser}
          openEditForm={switchToEditMode}
        />
      )}
      <div ref={formRef}>
        {userFormMode === MODE.ADD && (
          <UserForm mode={MODE.ADD} onSubmit={addUser} onCancel={closeForm} />
        )}
        {userFormMode === MODE.EDIT && editingUser && (
          <UserForm
            key={editingUser.id}
            mode={MODE.EDIT}
            onSubmit={updateUser}
            onCancel={closeForm}
            initialValues={editingUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;
