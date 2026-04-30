import { Input } from "@/components/ui/input";

interface CompanyNameInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const CompanyNameInput = ({
  value,
  placeholder,
  onChange,
}: CompanyNameInputProps) => (
  <div>
    <label className="text-sm font-semibold text-foreground mb-2 block">
      Company name
    </label>
    <Input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="border-2 border-foreground/20 bg-background"
    />
  </div>
);

export default CompanyNameInput;
