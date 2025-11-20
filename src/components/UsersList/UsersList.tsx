import type { User } from "../../types/user";
import styles from "./UsersList.module.css";
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";

interface UsersListProps {
  users: User[];
  onDelete: (userId: number) => void;
  openEditForm: (user: User) => void;
}

const UsersList = ({ users, onDelete, openEditForm }: UsersListProps) => {
  const onDeleteClick = (userId: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirm) return;

    onDelete(userId);
  };

  const onEditClick = (user: User) => {
    openEditForm(user);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.address.street}, {user.address.suite}, {user.address.city}
                , {user.address.zipcode}
              </td>
              <td>{user.phone}</td>
              <td className={styles.actions}>
                <button
                  className={styles.actionButton}
                  onClick={() => onDeleteClick(user.id!)}
                >
                  <FaRegTrashCan />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => onEditClick(user)}
                >
                  <FaPencil />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!users.length && <div className={styles.noUsers}>No users found</div>}
    </div>
  );
};

export default UsersList;
