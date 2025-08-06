import './Checkbox.css';
export const Checkbox = ({ text, onChange, name, checked, className }: {
    text?: string,
    onChange?: (checked: boolean) => void,
    name?: string,
    checked?: boolean,
    className?: string
}) => (
    <div className={`checkbox-wrapper-13 ${className}`}>
        <input id={name} type="checkbox" onChange={(e) => onChange?.(e.target.checked)} checked={checked} />
        <label htmlFor={name}>{text}</label>
    </div>
);