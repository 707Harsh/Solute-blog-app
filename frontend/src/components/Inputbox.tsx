interface InputboxProps {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Inputbox = ({label,type,placeholder, onChange} : InputboxProps) => {
    return (
        <div className="my-4">
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
        </div>
    )
}