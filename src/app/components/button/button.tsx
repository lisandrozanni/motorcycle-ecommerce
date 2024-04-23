import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  width?: number;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function Button({ text, width, type = "button", onClick }: ButtonProps) {
  return (
    <button
      className={styles.button}
      style={{
        width
      }}
      type={type}
      onClick={onClick}
    >
      <p>{text}</p>
    </button>
  );
}
