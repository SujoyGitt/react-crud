import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { userSchema } from "../validations/UserSchema";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import Axios from "../api/Axios";

// Infer type from schema
type UserFormData = yup.InferType<typeof userSchema>;

const AddEdit = ({ toast }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
  });
  type SubmitData = {
    name: string;
    email: string;
    username: string;
    age: number;
  };
  const onSubmit = async (data: SubmitData) => {
    if (id) {
      await Axios.put(`/users/${id}`, data);
      toast.current.show({
        severity: "success",
        summary: "Updated",
        detail: "Data updated successfully",
        life: 3000,
      });
    } else {
      await Axios.post("/users", data);
      toast.current.show({
        severity: "success",
        summary: "Added",
        detail: "Data added successfully",
        life: 3000,
      });
    }

    navigate("/");
  };

  useEffect(() => {
    if (id) {
      Axios(`/users/${id}`)
        .then((res) =>
          Object.keys(res.data).forEach((key) => setValue(key, res.data[key])),
        )
        .catch((err) => console.log(err));
    }
  }, [id, setValue]);

  return (
    <>
      <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100">
        <div
          className="surface-card p-5 border-round-2xl shadow-4"
          style={{ width: "100%", maxWidth: "450px" }}
        >
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold m-0 text-900">User Form</h2>
            <p className="text-600 mt-2">
              {id ? "Update" : "Create"} user information
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-column gap-4"
          >
            {/* Name */}
            <div className="flex flex-column gap-2">
              <label htmlFor="name" className="font-semibold text-700">
                Full Name
              </label>

              <InputText
                id="name"
                {...register("name")}
                placeholder="Enter full name"
                className={errors.name ? "p-invalid w-full" : "w-full"}
              />

              {errors.name && (
                <small className="p-error">{errors.name.message}</small>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-column gap-2">
              <label htmlFor="username" className="font-semibold text-700">
                Username
              </label>

              <InputText
                id="username"
                {...register("username")}
                placeholder="Enter username"
                className={errors.username ? "p-invalid w-full" : "w-full"}
              />

              {errors.username && (
                <small className="p-error">{errors.username.message}</small>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-column gap-2">
              <label htmlFor="email" className="font-semibold text-700">
                Email Address
              </label>

              <InputText
                id="email"
                {...register("email")}
                placeholder="Enter email"
                className={errors.email ? "p-invalid w-full" : "w-full"}
              />

              {errors.email && (
                <small className="p-error">{errors.email.message}</small>
              )}
            </div>

            {/* Age */}
            <div className="flex flex-column gap-2">
              <label htmlFor="age" className="font-semibold text-700">
                Age
              </label>

              <Controller
                name="age"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <InputNumber
                    id="age"
                    value={field.value}
                    onValueChange={(e) => field.onChange(e.value)}
                    useGrouping={false}
                    placeholder="Enter age"
                    className={errors.age ? "p-invalid w-full" : "w-full"}
                  />
                )}
              />

              {errors.age && (
                <small className="p-error">{errors.age.message}</small>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              label="Save User"
              icon="pi pi-check"
              className="w-full p-3 text-lg border-round-xl"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEdit;
