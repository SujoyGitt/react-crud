import { useEffect, useState } from "react";
import Axios from "../api/Axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useNavigate } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import type { RefObject } from "react";

type UsersListProps = {
  toast: RefObject<Toast | null>;
};
const UsersList = ({ toast }: UsersListProps) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    username: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    email: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    age: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    global: {
      value: "",
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const fetchUser = async () => {
    try {
      const resp = await Axios.get("/users");
      console.log(resp.data);

      setUsers(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = (id: number) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await Axios.delete(`/users/${id}`);
        fetchUser();
        toast.current?.show({
          severity: "error",
          summary: "Deleted",
          detail: "Data deleted successfully",
          life: 3000,
        });
      },
    });
  };
  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    age: number;
  };
  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          severity="warning"
          size="small"
          onClick={() => handleEdit(rowData.id)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          size="small"
          onClick={() => handleDelete(rowData.id)}
        />
      </div>
    );
  };
  const header = (
    <div className="flex justify-content-between align-items-center flex-wrap gap-3">
      <h3 className="m-0">Users List</h3>

      <span className="p-input-icon-left">
        <i className="pi pi-search pl-3" />

        <InputText
          placeholder="Search users..."
          className="pl-6"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              global: {
                ...prev.global,
                value: e.target.value,
              },
            }))
          }
        />
      </span>
    </div>
  );
  return (
    <div className="card border-round-2xl shadow-2">
      <DataTable
        value={users}
        paginator
        rows={5}
        stripedRows
        removableSort
        responsiveLayout="scroll"
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["name", "username", "email", "age"]}
        header={header}
        emptyMessage="No users found"
        className="p-datatable-sm"
      >
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
          sortable
        />

        <Column
          field="username"
          header="UserName"
          filter
          filterPlaceholder="Search by UserName"
          sortable
        />

        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Search by Email"
          sortable
        />

        <Column
          field="age"
          header="Age"
          filter
          filterPlaceholder="Search by Age"
          sortable
        />

        <Column
          header="Action"
          body={actionBodyTemplate}
          style={{ width: "140px" }}
        />
      </DataTable>
    </div>
  );
};

export default UsersList;
