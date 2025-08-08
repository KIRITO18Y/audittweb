import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const InputSearch = ({
    value,
    onChange,
    placeholder
}: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}) => {
    return (
        <div className="relative">
            <div className="inline-flex w-full sm:w-auto">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full sm:w-auto border rounded bg-white px-3 py-2 transition duration-200 border-gray-300 hover:border-indigo-500 
         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute right-2 top-3 text-gray-400" />
            </div>
        </div>
    );
};
