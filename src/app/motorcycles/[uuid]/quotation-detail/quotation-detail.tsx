"use client";

import React, { useState } from "react";
import Button from "@/app/components/button/button";
import Image from "next/image";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import formatNumber from "@/app/lib/utils";
import { AccessoryListProps, Accessory, AccessoryWithQuantity, QuotationDetailProps } from "@/app/lib/definitions";

import styles from "./quotation-detail.module.css";
import LeadForm from "../lead-form/lead-form";

function AccessoriesList({ accessories, onAddAccessory }: AccessoryListProps) {
  return (
    <section className={styles.accessoriesList}>
      {accessories.map((accessory) => (
        <div key={accessory.uuid} className={styles.accessoryCard}>
          <div className={styles.infoCard}>
            <Image
              src={accessory.variants[0].images[0].url}
              alt={accessory.name}
              width={150}
              height={150}
            />
            <div>
              <p className={styles.cardTitle}>{accessory.name}</p>
              <p className={styles.price}>${formatNumber(accessory.variants[0].prices[0].amount)}</p>
            </div>
          </div>
          <button onClick={() => onAddAccessory(accessory.uuid)}>
            <IoIosAdd size={30} color="#903DF7" />
          </button>
        </div>
      ))}
    </section>
  );
};

function SelectedAccessories({ accessories, onRemoveAccessory }: { accessories: Accessory[], onRemoveAccessory: (uuid: number) => void }) {
  const groupedAccessories = groupAccessories(accessories);

  const accessoriesCost = groupedAccessories.reduce(
    (total, { accessory, quantity }) => total + accessory.variants[0].prices[0].amount * quantity,
    0
  );

  return (
    <section className={styles.selectedCardContainer}>
      <h2>Cantidad: {accessories.length}</h2>
      <h3>Total: ${formatNumber(accessoriesCost)}</h3>
      {groupedAccessories.map(({ accessory, quantity }) => (
        <div key={accessory.uuid} className={styles.selectedCard}>
          <span>{accessory.name} (x{quantity})</span>
          <button onClick={() => onRemoveAccessory(accessory.uuid)}>
            <MdDeleteForever size={30} color="red" />
          </button>
        </div>
      ))}
    </section>
  );
};

function groupAccessories(accessories: Accessory[]): AccessoryWithQuantity[] {
  const accessoryMap: { [key: number]: AccessoryWithQuantity } = {};

  accessories.forEach((acc) => {
    if (accessoryMap[acc.uuid]) {
      accessoryMap[acc.uuid].quantity += 1;
    } else {
      accessoryMap[acc.uuid] = { accessory: acc, quantity: 1 };
    }
  });

  return Object.values(accessoryMap);
};

export default function QuotationDetail({ motorcycleName, uuid, motorcyclePrice, accessories }: QuotationDetailProps) {
  const [stage, setStage] = useState("initial");
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
  const [accessoriesCost, setAccessoriesCost] = useState(0);

  const converterPrice = parseFloat((motorcyclePrice || "").replace(/\./g, ""));
  const priceTotal = converterPrice + accessoriesCost;
  const formattedPrice = formatNumber(priceTotal);

  const addAccessory = (uuid: number) => {
    const accessory = accessories.find((a) => a.uuid === uuid);

    if (accessory) {
      setAccessoriesCost((prevCost) => prevCost + accessory.variants[0].prices[0].amount);
      setSelectedAccessories((prev) => [...prev, accessory]);
    }
  };

  const removeAccessory = (uuid: number) => {
    setSelectedAccessories((prev) => {
      const updatedAccessories = [...prev];
      const index = updatedAccessories.findIndex((acc) => acc.uuid === uuid);

      if (index >= 0) {
        const removedAccessory = updatedAccessories.splice(index, 1)[0];
        setAccessoriesCost(accessoriesCost - removedAccessory.variants[0].prices[0].amount);
      }

      return updatedAccessories;
    });
  };

  const groupedAccessories = groupAccessories(selectedAccessories);

  const advanceStage = () => {
    if (stage === "initial") setStage("quote");
    if (stage === "quote") setStage("form");
  };

  return (
    <section className={styles.container}>
      {stage === "initial" && (
        <>
          <div className={styles.accessoriesContainer}>
            <AccessoriesList accessories={accessories} onAddAccessory={addAccessory} />
            <SelectedAccessories accessories={selectedAccessories} onRemoveAccessory={removeAccessory} />
          </div>
          <Button text="Solicitar cotización" onClick={advanceStage} />
        </>
      )}

      {stage === "quote" && (
        <section>
          <div className={styles.quoteContainer}>
            <h2 className={styles.quoteTitle}>Detalle de la cotización</h2>
            <div className={styles.quoteInfo}>
              <p>{motorcycleName}</p>
              <p>${motorcyclePrice}</p>
            </div>
    
            {groupedAccessories.map(({ accessory, quantity }) => (
              <div key={accessory.uuid} className={styles.quoteInfo}>
                <p>{accessory.name} (x{quantity})</p>
                <p>${formatNumber(accessory.variants[0].prices[0].amount * quantity)}</p>
              </div>
            ))}
          </div>
          <div className={styles.quoteInfo}>
            <p className={styles.quotePrice}>Precio total</p>
            <p className={styles.quoteValue}>${formattedPrice}</p>
          </div>
          <Button text="Reservar" onClick={advanceStage} />
        </section>
      )}

      {stage === "form" && <LeadForm uuid={uuid} />}
    </section>
  );
};
