import { MessageCircle } from "lucide-react";

type WhatsAppExportButtonProps = {
  phoneNumber: string;
  message: string;
  disabled: boolean;
};

export function WhatsAppExportButton({ phoneNumber, message, disabled }: WhatsAppExportButtonProps) {
  const handleClick = () => {
    if (disabled) {
      return;
    }

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" className="primary-action intake-summary__cta" onClick={handleClick} disabled={disabled}>
      <MessageCircle size={17} />
      Enviar resumen por WhatsApp
    </button>
  );
}
