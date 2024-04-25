"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button/button";
import { LeadFormProps } from "@/app/lib/definitions";

import styles from "./lead-form.module.css";

export default function LeadForm({ uuid, motorcycleName, motorcyclePrice, accessories }: LeadFormProps) {
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      phone: "",
    };

    if (!form.email.includes("@")) {
      newErrors.email = "Correo electrónico no válido.";
    }

    const phoneTrimmed = form.phone.trim();

    if (!phoneTrimmed) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (isNaN(Number(phoneTrimmed))) {
      newErrors.phone = "El teléfono debe contener solo números.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const FormAction = async (formData: FormData) => {
    const rawFormData = {
      uuid,
      contact: {
        firstname: formData.get("firstname"),
        email: formData.get("email"),
        phone: formData.get("phone")
      }
    };

    if (validateForm()) {
      try {
        const response = await axios.post(`/motorcycles/${uuid}/api`, {
          body: JSON.stringify(rawFormData)
        });
  
        if (response.status === 200) router.push("/");
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  return (
    <form action={FormAction} className={styles.form}>
      <label className={styles.label}>
        Nombre:
      </label>
      <input
        type="text"
        name="firstname"
        value={form.firstname}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>
        Correo electrónico:
      </label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className={styles.input}
      />
      {errors.email && <span className={styles.error}>{errors.email}</span>}
      <label className={styles.label}>
        Teléfono:
      </label>
      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className={styles.input}
      />
      {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      <Button text="Contactar" type="submit" />
    </form>
  );
}
