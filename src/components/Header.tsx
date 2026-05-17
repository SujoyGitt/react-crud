import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router-dom";


export default function UserHeader() {
    const navigate = useNavigate();
  return (
    <div
      className="
        border-round-3xl
        p-5
        mb-4
        shadow-4
        flex
        justify-content-between
        align-items-center
        flex-wrap
        gap-4
      "
      style={{
        background:
          "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)",
      }}
    >
      {/* Left Side */}
      <div className="flex align-items-center gap-4">
        <Avatar
          icon="pi pi-users"
          size="xlarge"
          shape="circle"
          className="bg-white-alpha-20 text-white"
        />

        <div>
          <h2 className="m-0 text-white text-3xl font-bold">
            User Management
          </h2>

          <span className="text-white-alpha-80 text-sm">
            Manage users, roles and account details
          </span>
        </div>
      </div>

      <Button
        label="Add User"
        icon="pi pi-plus"
        rounded
        raised
        severity="help"
        className="bg-white text-primary border-none px-4"
        onClick={()=>navigate("/add")}
      />
    </div>
  );
}