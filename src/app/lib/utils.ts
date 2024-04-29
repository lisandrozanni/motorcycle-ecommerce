export default function formatNumber(number: number): string {
  return Math.floor(number).toLocaleString('es-AR');
}
