import { useState } from "react";
import type { User } from "../../types/user";
import { MODE, type Mode } from "../../constants";
import styles from "./UserForm.module.css";

interface UserFormProps {
  mode: Mode;
  initialValues?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserForm = ({
  initialValues,
  onSubmit,
  onCancel,
  mode,
}: UserFormProps) => {
  const [form, setForm] = useState<User>(
    initialValues ?? {
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    }
  );

  const updateForm = <T extends keyof User>(key: T, value: User[T]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const onCancelClick = () => {
    onCancel();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitForm}>
        <h2>
          {mode === MODE.ADD ? "Add a new user" : "Edit an existing user"}
        </h2>

        <div className={styles.formFields}>
          <div>
            <div>
              <label className={styles.required}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Mary Smith"
                required
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
            </div>

            <div>
              <label className={styles.required}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Mary.Smith"
                required
                value={form.username}
                onChange={(e) => updateForm("username", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className={styles.required}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="mary.smith@gmail.com"
                required
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />
            </div>

            <div>
              <label className={styles.required}>Street</label>
              <input
                required
                value={form.address.street}
                placeholder="Main Street"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      street: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div>
              <label className={styles.required}>Suite</label>
              <input
                required
                value={form.address.suite}
                placeholder="Apt. 1"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      suite: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div>
              <label className={styles.required}>City</label>
              <input
                required
                value={form.address.city}
                placeholder="London"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      city: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div>
              <label className={styles.required}>Zipcode</label>
              <input
                required
                value={form.address.zipcode}
                placeholder="11111-2222"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      zipcode: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          <div>
            <div>
              <label>Latitude</label>
              <input
                value={form.address.geo?.lat}
                placeholder="40.714"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      geo: {
                        ...prev.address.geo,
                        lat: e.target.value,
                      },
                    },
                  }))
                }
              />
            </div>

            <div>
              <label>Longitude</label>
              <input
                value={form.address.geo.lng}
                placeholder="-74.006"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      geo: {
                        ...prev.address.geo,
                        lng: e.target.value,
                      },
                    },
                  }))
                }
              />
            </div>

            <div>
              <label htmlFor="phone" className={styles.required}>
                Phone
              </label>
              <input
                required
                type="tel"
                id="phone"
                name="phone"
                placeholder="+372 5555 5555"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
              />
            </div>

            <div>
              <label>Website</label>
              <input
                type="text"
                id="website"
                name="website"
                placeholder="www.example.com"
                value={form.website}
                onChange={(e) => updateForm("website", e.target.value)}
              />
            </div>

            <div>
              <label>Company Name</label>
              <input
                value={form.company.name}
                placeholder="Example Company"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      name: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div>
              <label>Company Catch Phrase</label>
              <input
                value={form.company.catchPhrase}
                placeholder="Centralized empowering task-force"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      catchPhrase: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div>
              <label>Company Bs</label>
              <input
                value={form.company.bs}
                placeholder="Target end-to-end models"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      bs: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button type="submit">
            {mode === MODE.ADD ? "Add User" : "Update User"}
          </button>
          <button className="secondary" onClick={() => onCancelClick()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
