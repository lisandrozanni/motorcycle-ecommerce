"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button/button";
import { Contact } from "@/app/lib/definitions";

import styles from "./lead-form.module.css";

export default function LeadForm({ uuid }: { uuid: string }) {
  const router = useRouter();

  const [form, setForm] = useState<Contact>({
    firstname: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Contact>({
    firstname: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      firstname: "",
      email: "",
      phone: "",
    };

    if (form.firstname.length === 0) {
      newErrors.firstname = "Debe escribir el nombre.";
    }

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

  const formAction = async (formData: FormData) => {
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
          body: rawFormData
        });

        if (response.status === 200) router.push("/motorcycles/thank-you-page");
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }

  return (
    <form action={formAction} className={styles.form}>
      <label className={styles.label} htmlFor="firstname">
        Nombre:
      </label>
      <input
        type="text"
        name="firstname"
        value={form.firstname}
        onChange={handleChange}
        className={styles.input}
        id="firstname"
      />
      {errors.firstname && <span className={styles.error}>{errors.firstname}</span>}
      <label className={styles.label} htmlFor="email">
        Correo electrónico:
      </label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className={styles.input}
        id="email"
      />
      {errors.email && <span className={styles.error}>{errors.email}</span>}
      <label className={styles.label} htmlFor="phone">
        Teléfono:
      </label>
      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className={styles.input}
        id="phone"
      />
      {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      <Button text="Contactar" type="submit" />
    </form>
  );
}
