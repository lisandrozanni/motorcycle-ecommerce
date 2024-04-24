"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button/button";

import styles from "./lead-form.module.css";

export default function LeadForm({ uuid }: { uuid: string }) {
  const router = useRouter();

  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        uuid,
        accesories: ["alskjda92837942"],
        contact: {
          firstname: form.firstname,
          lastname: "Zanni",
          email: form.email,
          phone: form.phone,
          finace: true,
          trade: false
        },
      };

      router.push("/");

      try {
        // const response = await fetch("/api/lead-form", options);

        // console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
