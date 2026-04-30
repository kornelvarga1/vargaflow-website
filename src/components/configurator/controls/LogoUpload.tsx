import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface LogoUploadProps {
  logoUrl: string | null;
  onUpload: (url: string | null) => void;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const LogoUpload = ({ logoUrl, onUpload }: LogoUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      toast.error("Logo must be under 5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onUpload(reader.result as string);
    reader.readAsDataURL(file);
    // reset so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <div>
      <label className="text-sm font-semibold text-foreground mb-2 block">
        Your logo
      </label>
      {logoUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Uploaded logo"
            className="h-10 w-auto rounded border-2 border-foreground/20 object-contain bg-white p-1"
          />
          <button
            onClick={() => onUpload(null)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-foreground/20 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors"
        >
          <Upload size={16} />
          Upload logo
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default LogoUpload;
